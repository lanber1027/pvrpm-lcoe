import os
import time
import multiprocessing as mp
from typing import List

import pandas as pd
import numpy as np
import scipy
import scipy.stats as stats
import matplotlib.pyplot as plt
from dateutil.relativedelta import relativedelta
from datetime import datetime
from tqdm import tqdm

from pvrpm.core.enums import ConfigKeys as ck
from pvrpm.core.case import SamCase
from pvrpm.core.components import Components
from pvrpm.core.utils import summarize_dc_energy, component_degradation
from pvrpm.core.logger import logger


def cf_interval(alpha: float, std: float, num_samples: int) -> float:
    """
    Calculates the two tails margin of error given the desired input. The margin of error is the value added and subtracted by the sample mean to obtain the confidence interval

    Sample sizes less then equal to 30 use t score, greater then 30 use z score

    Args:
        alpha (float): The significance level for the interval
        std (float): The standard deviation of the data
        num_samples (int): The number of samples in the data

    Returns:
        float: The margin of error
    """
    # two tails
    alpha = alpha / 2

    if num_samples > 30:
        score = stats.norm.ppf(alpha)
    else:
        score = stats.t.ppf(1 - alpha, num_samples - 1)

    return score * std / np.sqrt(num_samples)


def simulate_day(case: SamCase, comp: Components, day: int):
    """
    Updates and increments the simulation by a day, performing all neccesary component updates.

    Args:
        case (:obj:`SamCase`): The current Sam Case of the simulation
        comp (:obj:`Components`): The components class containing all the outputs for this simulation
        day (int): Current day in the simulation
    """
    for c in ck.component_keys:
        if not case.config.get(c, None):
            continue

        df = comp.comps[c]
        # if component can't fail, just continue
        if case.config[c][ck.CAN_FAIL]:
            comp.uptime[c] += case.config[c][ck.NUM_COMPONENT]

            # decrement time to failures for operational modules
            df.loc[df["state"] == 1, "time_to_failure"] -= 1

            # fail components when their time has come
            comp.fail_component(c)

            if case.config[c][ck.CAN_REPAIR]:
                # decrement time to repair for failed modules
                df.loc[df["state"] == 0, "time_to_repair"] -= 1

                # repair components when they are done and can be repaired
                comp.repair_component(c, day)

            if case.config[c].get(ck.WARRANTY, None):
                df["time_left_on_warranty"] -= 1

            # availability
            if c == ck.GRID:
                # for the grid only, the availability is based on the full 24-hour day.
                df.loc[df["state"] == 0, "avail_downtime"] += 24
            else:
                # else, use the sun hours for this day
                df.loc[df["state"] == 0, "avail_downtime"] += case.daylight_hours[day % 365]

        # module can still degrade even if it cant fail
        if case.config[c].get(ck.DEGRADE, None):
            df["days_of_degradation"] += 1
            df["degradation_factor"] = [
                component_degradation(case.config[c][ck.DEGRADE] / 365, d) for d in df["days_of_degradation"]
            ]


def run_system_realization(
    case: SamCase,
    seed: bool = False,
    realization_num: int = 0,
    progress_bar: bool = False,
) -> Components:
    """
    Run a full realization for calculating costs

    Args:
        case (:obj:`SamCase`): The loaded and verified case to use with the simulation
        seed (bool, Optional): Whether to seed the random number generator, for multiprocessing
        realization_num (int, Optional): Current realization number, used for multiprocessing
        progress_bar (bool, Optional): Whether to display progress bar during the realization

    Returns:
        :obj:`Components`: The components object which contains all the data for this realization
    """
    if seed:
        np.random.seed()

    # data storage
    comp = Components(case)
    lifetime = int(case.config[ck.LIFETIME_YRS])

    if case.config[ck.TRACKING]:
        comp.tracker_power_loss_factor[0] = 1
        comp.tracker_availability[0] = 1

    # initial timestep
    comp.module_degradation_factor[0] = comp.current_degradation()
    comp.dc_power_availability[0] = comp.dc_availability()
    comp.ac_power_availability[0] = comp.ac_availability()

    if progress_bar:
        iterator = tqdm(
            range(1, lifetime * 365),
            ascii=True,
            desc=f"Running realization {realization_num}",
            unit="day",
            position=mp.current_process()._identity[0],
            leave=False,
        )
    else:
        logger.info(f"Running realization {realization_num}...")
        iterator = range(1, lifetime * 365)

    for i in iterator:
        # calculate new labor rate each year
        if i == 1 or i % 365 == 0:
            comp.labor_rate = case.config[ck.LABOR_RATE] * np.power((1 + case.config[ck.INFLATION]) / 100, i)
            if case.config[ck.TRACKING]:
                for fail in case.config[ck.TRACKER][ck.FAILURE].keys():
                    case.config[ck.TRACKER][ck.FAILURE][fail][ck.COST] *= np.power(
                        (1 + case.config[ck.INFLATION]) / 100, i
                    )

        # timestep is applied each day
        simulate_day(case, comp, i)

        if case.config[ck.TRACKING]:
            comp.tracker_availability[i], comp.tracker_power_loss_factor[i] = comp.tracker_power_loss(i)

        comp.module_degradation_factor[i] = comp.current_degradation()
        comp.dc_power_availability[i] = comp.dc_availability()
        comp.ac_power_availability[i] = comp.ac_availability()

    # create same performance adjustment tables for avail, degradation, tracker losses
    if case.config[ck.TRACKING]:
        daily_dc_loss = 100 * (
            1 - (comp.dc_power_availability * comp.module_degradation_factor * comp.tracker_power_loss_factor)
        )
    else:
        daily_dc_loss = 100 * (1 - (comp.dc_power_availability * comp.module_degradation_factor))

    daily_ac_loss = 100 * (1 - comp.ac_power_availability)

    case.value("en_dc_lifetime_losses", 1)
    case.value("dc_lifetime_losses", list(daily_dc_loss))

    case.value("en_ac_lifetime_losses", 1)
    case.value("ac_lifetime_losses", list(daily_ac_loss))

    o_m_yearly_costs = np.zeros(lifetime)
    for c in ck.component_keys:
        if not case.config.get(c, None):
            continue

        comp_yearly_cost = np.sum(np.reshape(comp.costs[c], (lifetime, 365)), axis=1)
        o_m_yearly_costs += comp_yearly_cost

    case.value("om_fixed", list(o_m_yearly_costs))

    case.simulate()

    # reset tracker failure cost
    if case.config[ck.TRACKING]:
        for fail in case.config[ck.TRACKER][ck.FAILURE].keys():
            case.config[ck.TRACKER][ck.FAILURE][fail][ck.COST] = comp.original_tracker_cost

    # add the results of the simulation to the components class and return
    comp.timeseries_dc_power = case.value("dc_net")
    comp.timeseries_ac_power = case.value("gen")
    comp.lcoe = case.value("lcoe_real")
    # remove the first element from cf_energy_net because it is always 0, representing year 0
    comp.annual_energy = np.array(case.output("cf_energy_net")[1:])

    return comp


def gen_results(case: SamCase, results: List[Components]) -> List[pd.DataFrame]:
    """
    Generates results for the given SAM case and list of component objects containing the results of each realization.

    Args:
        case (:obj:`SamCase`): The loaded and verified case to use with the simulation
        results (:obj:`list(Components)`): List of component objects that contain the results for each realization

    Returns:
        :obj:`list(pd.DataFrame)`: List of dataframes containing the results.

    Note:
        The order of the returned dataframes is:
            - Summary Results
            - Degradation Results
            - DC Power
            - AC Power
            - Yearly Costs
    """
    summary_index = ["Base Case"]
    summary_data = {"lcoe": [case.base_lcoe]}
    lifetime = int(case.config[ck.LIFETIME_YRS])
    p_vals = [99, 95, 90, 75, 50, 10]

    # ac energy
    cumulative_ac_energy = np.cumsum(case.base_annual_energy)

    for i in range(int(lifetime)):
        summary_data[f"annual_ac_energy_{i+1}"] = [case.base_annual_energy[i]]
        summary_data[f"cumulative_ac_energy_{i+1}"] = [cumulative_ac_energy[i]]

    # dc energy
    for i in range(len(case.base_dc_energy)):
        summary_data[f"dc_energy_{i+1}"] = [case.base_dc_energy[i]]

    # TODO: also, need to clean this up, i just use dictionaries and fill in blanks for base case, but this can be much cleaner
    # per realization results
    day_index = np.arange(lifetime * 365) + 1
    hour_index = np.arange(lifetime * 365 * 24)
    year_index = np.arange(lifetime) + 1
    yearly_cost_index = []
    degradation_data = {}
    timeseries_dc_data = {}
    timeseries_ac_data = {}
    yearly_cost_data = {}
    for i, comp in enumerate(results):
        # daily degradation
        degradation_data[f"Realization {i+1}"] = comp.module_degradation_factor

        # power
        timeseries_dc_data[f"Realization {i+1}"] = comp.timeseries_dc_power
        timeseries_ac_data[f"Realization {i+1}"] = comp.timeseries_ac_power

        # yearly cost
        yearly_cost_index.append(f"Realization {i+1}")
        for c in ck.component_keys:
            if not case.config.get(c, None):
                continue
            if c not in yearly_cost_data:
                yearly_cost_data[c] = []
            yearly_cost_data[c] += list(np.sum(np.reshape(comp.costs[c], (lifetime, 365)), axis=1))

        # summary
        summary_index.append(f"Realization {i+1}")
        summary_data["lcoe"] += [comp.lcoe]

        # ac energy
        # remove the first element from cf_energy_net because it is always 0, representing year 0
        cumulative_ac_energy = np.cumsum(comp.annual_energy)

        for i in range(int(lifetime)):
            summary_data[f"annual_ac_energy_{i+1}"] += [comp.annual_energy[i]]
            summary_data[f"cumulative_ac_energy_{i+1}"] += [cumulative_ac_energy[i]]

        # dc energy
        dc_energy = summarize_dc_energy(comp.timeseries_dc_power, lifetime)
        for i in range(len(dc_energy)):
            summary_data[f"dc_energy_{i+1}"] += [dc_energy[i]]

        # calculate total failures, availability, mttf, mtbf, etc
        for c in ck.component_keys:
            if not case.config.get(c, None):
                continue
            if case.config[c][ck.CAN_FAIL]:
                if f"{c}_total_failures" not in summary_data:
                    summary_data[f"{c}_total_failures"] = [None]  # no failures for base case
                sum_fails = comp.comps[c]["cumulative_failures"].sum()
                summary_data[f"{c}_total_failures"] += [sum_fails]
                for fail in case.config[c].get(ck.FAILURE, {}).keys():
                    if f"{c}_failures_by_type_{fail}" not in summary_data:
                        summary_data[f"{c}_failures_by_type_{fail}"] = [None]
                    summary_data[f"{c}_failures_by_type_{fail}"] += [comp.comps[c][f"failure_by_type_{fail}"].sum()]

                # mean time between failure
                if f"{c}_mtbf" not in summary_data:
                    summary_data[f"{c}_mtbf"] = [None]
                summary_data[f"{c}_mtbf"] += [comp.uptime[c] / sum_fails]
            else:
                # mean time between failure
                if f"{c}_mtbf" not in summary_data:
                    summary_data[f"{c}_mtbf"] = [None]
                summary_data[f"{c}_mtbf"] += [comp.uptime[c]]

            # availability
            if f"{c}_availability" not in summary_data:
                summary_data[f"{c}_availability"] = [None]
            summary_data[f"{c}_availability"] += [
                (
                    1
                    - (comp.comps[c]["avail_downtime"].sum() / (lifetime * case.annual_daylight_hours))
                    / case.config[c][ck.NUM_COMPONENT]
                )
            ]

    # generate dataframes
    summary_results = pd.DataFrame(index=summary_index, data=summary_data)
    summary_results.index.name = "Realization"
    # reorder columns for summary results
    reorder = [summary_results.columns[0]]  # lcoe
    reorder += list(summary_results.columns[lifetime * 3 + 1 :])  # failures and avail
    reorder += list(summary_results.columns[1 : lifetime * 3 + 1])  # energy
    summary_results = summary_results[reorder]

    degradation_results = pd.DataFrame(index=day_index, data=degradation_data)
    dc_power_results = pd.DataFrame(index=hour_index, data=timeseries_dc_data)
    ac_power_results = pd.DataFrame(index=hour_index, data=timeseries_ac_data)
    dc_power_results.index.name = "Hour"
    ac_power_results.index.name = "Hour"
    degradation_results.index.name = "Day"

    cost_index = pd.MultiIndex.from_product([yearly_cost_index, year_index], names=["Realization", "Year"])
    yearly_cost_results = pd.DataFrame(index=cost_index, data=yearly_cost_data)
    yearly_cost_results["total"] = yearly_cost_results.sum(axis=1)

    stats_append = []
    summary_no_base = summary_results.iloc[1:]
    min = summary_no_base.min()
    min.name = "min"
    stats_append.append(min)

    max = summary_no_base.max()
    max.name = "max"
    stats_append.append(max)

    mean = summary_no_base.mean()
    mean.name = "mean"
    stats_append.append(mean)

    median = summary_no_base.median()
    median.name = "median"
    stats_append.append(median)

    std = summary_no_base.std()
    std.name = "stddev"
    stats_append.append(std)

    conf_interval = case.config[ck.CONF_INTERVAL]
    conf_int = cf_interval(1 - (conf_interval / 100), std, case.config[ck.NUM_REALIZATION])

    lower_conf = mean - conf_int
    lower_conf.name = f"{conf_interval}% lower confidence interval of mean"
    stats_append.append(lower_conf)

    upper_conf = mean + conf_int
    upper_conf.name = f"{conf_interval}% upper confidence interval of mean"
    stats_append.append(upper_conf)

    # p test, which is using the ppf of the normal distribituion with our calculated mean and std. We use scipy's functions for this
    # see https://help.helioscope.com/article/141-creating-a-p50-and-p90-with-helioscope
    for p in p_vals:
        values = []
        # calculate the p value for every column
        for m, s in zip(mean, std):
            if s != 0:  # for columns with no STDDEV
                values.append(stats.norm.ppf((1 - p / 100), loc=m, scale=s))
            else:
                values.append(None)
        # save results
        values = pd.Series(values, index=mean.index)
        values.name = f"P{p}"
        stats_append.append(values)

    summary_results = summary_results.append(stats_append)

    return [
        summary_results,
        degradation_results,
        dc_power_results,
        ac_power_results,
        yearly_cost_results,
    ]


def graph_results(case: SamCase, results: List[Components], save_path: str = None) -> None:
    """
    Generate graphs from a list of Component objects from each realization

    Args:
        case (:obj:`SamCase`): The loaded and verified case to use with the simulation
        results (:obj:`list(Components)`): List of component objects that contain the results for each realization
        save_path (str, Optional): Path to save graphs to, if provided
    """
    lifetime = int(case.config[ck.LIFETIME_YRS])
    colors = ["r", "g", "b", "c", "m", "y", "k", "tab:orange", "tab:brown", "lime", "tab:gray"]

    # base case data to compare to
    # base load and loss is same throughout realizations
    base_losses = case.base_losses
    base_load = np.array(case.base_load)
    base_ac_energy = np.array(case.base_ac_energy)
    base_annual_energy = np.array(case.base_annual_energy)

    # parse data
    avg_ac_energy = np.zeros(lifetime * 365 * 24)
    avg_annual_energy = np.zeros(lifetime)

    # computing the average across every realization
    for comp in results:
        avg_ac_energy += np.array(comp.timeseries_ac_power)
        avg_annual_energy += np.array(comp.annual_energy)

    # monthly and annual energy
    avg_ac_energy /= len(results)
    avg_annual_energy /= len(results)

    avg_ac_energy = np.reshape(avg_ac_energy, (lifetime, 8760))  # yearly energy by hour
    avg_ac_energy = np.sum(avg_ac_energy, axis=0) / lifetime  # yearly energy average
    avg_ac_energy = np.reshape(avg_ac_energy, (365, 24))  # day energy by hour
    avg_ac_energy = np.sum(avg_ac_energy, axis=1)  # energy per day

    base_ac_energy = np.reshape(base_ac_energy, (lifetime, 365 * 24))
    base_ac_energy = np.sum(base_ac_energy, axis=0) / lifetime
    base_ac_energy = np.reshape(base_ac_energy, (365, 24))
    base_ac_energy = np.sum(base_ac_energy, axis=1)

    base_load = np.reshape(base_load, (365, 24))
    base_load = np.sum(base_load, axis=1)

    # calculate per month energy averaged across every year on every realization
    current_month = datetime(datetime.utcnow().year, 1, 1)
    delta = relativedelta(months=1)
    start = 0
    monthly_energy = {}
    monthly_load = {}
    base_monthly_energy = {}
    for _ in range(12):
        month = current_month.strftime("%b")
        num_days = ((current_month + delta) - current_month).days
        monthly_energy[month] = np.sum(avg_ac_energy[start : start + num_days])
        base_monthly_energy[month] = np.sum(base_ac_energy[start : start + num_days])
        monthly_load[month] = np.sum(base_load[start : start + num_days])
        current_month += delta
        start += num_days

    fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
    fig.set_figheight(5)
    fig.set_figwidth(10)
    ax1.bar(list(monthly_energy.keys()), list(monthly_energy.values()))
    ax1.set_title("Realization Average")
    ax1.set_xlabel("Month")
    ax1.set_ylabel("kWh")

    ax2.bar(list(monthly_energy.keys()), list(base_monthly_energy.values()))
    ax2.set_title("Base Case")
    ax2.set_xlabel("Month")
    ax2.set_ylabel("kWh")

    fig.suptitle("Monthly Energy Production")
    fig.tight_layout()
    if save_path:
        plt.savefig(os.path.join(save_path, "Average Monthly Energy Production.png"), bbox_inches="tight", dpi=200)
    else:
        plt.show()

    plt.close()  # clear plot

    # graph the monthly energy against the monthly load
    fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
    fig.set_figheight(5)
    fig.set_figwidth(10)

    ind = np.arange(len(monthly_energy))
    ax1.bar(ind - 0.2, list(monthly_energy.values()), width=0.4, label="AC Energy")
    ax1.bar(ind + 0.2, list(monthly_load.values()), width=0.4, color="tab:gray", label="Electricity Load")
    ax1.set_title("Realization Average")
    ax1.set_xlabel("Month")
    ax1.set_xticks(ind)
    ax1.set_xticklabels(labels=list(monthly_energy.keys()))
    ax1.set_ylabel("kWh")

    ax2.bar(ind - 0.2, list(base_monthly_energy.values()), width=0.4)
    ax2.bar(ind + 0.2, list(monthly_load.values()), width=0.4, color="tab:gray")
    ax2.set_title("Base Case")
    ax2.set_xlabel("Month")
    ax2.set_xticks(ind)
    ax2.set_xticklabels(labels=list(monthly_energy.keys()))
    ax2.set_ylabel("kWh")

    fig.legend()
    fig.suptitle("Monthly Energy and Load")
    fig.tight_layout()
    if save_path:
        plt.savefig(os.path.join(save_path, "Average Monthly Energy and Load.png"), bbox_inches="tight", dpi=200)
    else:
        plt.show()

    plt.close()  # clear plot

    fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
    fig.set_figheight(5)
    fig.set_figwidth(10)

    ax1.bar(np.arange(lifetime) + 1, avg_annual_energy)
    ax1.set_title("Realization Average")
    ax1.set_xlabel("Year")
    ax1.set_ylabel("kWh")

    ax2.bar(np.arange(lifetime) + 1, base_annual_energy)
    ax2.set_title("Base Case")
    ax2.set_xlabel("Year")
    ax2.set_ylabel("kWh")

    fig.suptitle("Annual Energy Production")
    fig.tight_layout()
    if save_path:
        plt.savefig(os.path.join(save_path, "Average Annual Energy Production.png"), bbox_inches="tight", dpi=200)
    else:
        plt.show()

    plt.close()  # clear plot

    # losses
    loss_data = {
        "AC wiring loss": base_losses["acwiring_loss"],
        "DC power optimizer loss": base_losses["dcoptimizer_loss"],
        "Transformer loss": (base_losses["transformer_load_loss"] + base_losses["transformer_no_load_loss"]),
        "Transmission loss": base_losses["transmission_loss"],
        "DC wiring loss": 0,
        "DC diode and connection losses": 0,
        "DC mismatch loss": 0,
        "DC nameplate loss": 0,
        "POA rear irradiance loss": 0,
        "POA soiling loss": 0,
        "DC tracking loss": 0,
    }

    # need to combine losses for these values on each subarray
    for i in range(1, 5):  # 4 subarrays
        loss_data["DC wiring loss"] += base_losses[f"subarray{i}_dcwiring_loss"]
        loss_data["DC diode and connection losses"] += base_losses[f"subarray{i}_diodeconn_loss"]
        loss_data["DC mismatch loss"] += base_losses[f"subarray{i}_mismatch_loss"]
        loss_data["DC nameplate loss"] += base_losses[f"subarray{i}_nameplate_loss"]
        loss_data["POA rear irradiance loss"] += base_losses[f"subarray{i}_rear_irradiance_loss"]
        loss_data["POA soiling loss"] += base_losses[f"subarray{i}_soiling"]
        loss_data["DC tracking loss"] += base_losses[f"subarray{i}_tracking_loss"]

    # only average by the enabled sub arrays, non enabled sub arrays would have values of 0
    loss_data["DC wiring loss"] /= case.config[ck.MULTI_SUBARRAY]
    loss_data["DC diode and connection losses"] /= case.config[ck.MULTI_SUBARRAY]
    loss_data["DC mismatch loss"] /= case.config[ck.MULTI_SUBARRAY]
    loss_data["DC nameplate loss"] /= case.config[ck.MULTI_SUBARRAY]
    loss_data["POA rear irradiance loss"] /= case.config[ck.MULTI_SUBARRAY]
    loss_data["POA soiling loss"] /= case.config[ck.MULTI_SUBARRAY]
    loss_data["DC tracking loss"] /= case.config[ck.MULTI_SUBARRAY]

    fig, ax1 = plt.subplots(1, 1, sharey=True)
    fig.set_figheight(5)
    fig.set_figwidth(10)

    for i, (k, c) in enumerate(zip(sorted(list(loss_data.keys())), colors)):
        ax1.bar(i, loss_data[k], width=0.3, color=c, label=k)

    # remove x axis labels
    ax1.xaxis.set_visible(False)

    ax1.set_ylabel("Percent")

    fig.legend(bbox_to_anchor=(0.8, 0.0, 0.5, 0.5))
    fig.suptitle("Energy Loss")
    fig.tight_layout()
    if save_path:
        plt.savefig(os.path.join(save_path, "Energy Loss.png"), bbox_inches="tight", dpi=200)
    else:
        plt.show()

    plt.close()  # clear plot

    # box plot for lcoe
    lcoe = np.array([comp.lcoe for comp in results])
    plt.boxplot(lcoe, vert=False, labels=["LCOE"])
    plt.title("LCOE Box Plot for Realizations")

    if save_path:
        plt.savefig(os.path.join(save_path, "LCOE Box Plot.png"), bbox_inches="tight", dpi=200)
    else:
        plt.show()

    plt.close()  # clear plot


def pvrpm_sim(
    case: SamCase,
    save_results: bool = False,
    save_graphs: bool = False,
    progress_bar: bool = False,
    threads: int = 1,
) -> List[Components]:
    """
    Run the PVRPM simulation on a specific case. Results will be saved to the folder specified in the configuration.

    Args:
        case (:obj:`SamCase`): The loaded and verified case to use with the simulation
        save_results (bool, Optional): Whether to save output csv results
        save_graphs (bool, Optional): Whether to save output graphs
        progress_bar (bool, Optional): Whether to display progress bar for each realization
        threads (int, Optional): Number of threads to use for paralizing realizations

    Returns:
        :obj:`list(Components)`: Returns the list of results Component objects for each realization
    """
    # tqdm multiprocessing setup
    mp.freeze_support()  # for Windows support
    tqdm.set_lock(mp.RLock())  # for managing output contention

    save_path = case.config[ck.RESULTS_FOLDER]
    lifetime = int(case.config[ck.LIFETIME_YRS])
    if threads == 0:
        threads = mp.cpu_count()

    logger.info("Running base case simulation...")
    start = time.time()
    case.base_case_sim()
    logger.info("Base case simulation took: {:.2f} seconds".format(time.time() - start))

    # realize what we are doing in life
    results = []
    args = [(case, True, i + 1, progress_bar) for i in range(case.config[ck.NUM_REALIZATION])]
    with mp.Pool(threads, initializer=tqdm.set_lock, initargs=(tqdm.get_lock(),)) as p:
        results = p.starmap(run_system_realization, args)

    # gen all those results
    summary_results, degradation_results, dc_power_results, ac_power_results, yearly_cost_results = gen_results(
        case,
        results,
    )

    # finally, graph results
    if save_graphs:
        graph_results(case, results, save_path=save_path)
        logger.info(f"Graphs saved to {save_path}")
    else:
        graph_results(case, results)

    # save results
    if save_results:
        summary_results.to_csv(os.path.join(save_path, "PVRPM_Summary_Results.csv"), index=True)
        degradation_results.to_csv(os.path.join(save_path, "Daily_Degradation.csv"), index=True)
        dc_power_results.to_csv(os.path.join(save_path, "Timeseries_DC_Power.csv"), index=True)
        ac_power_results.to_csv(os.path.join(save_path, "Timeseries_AC_Power.csv"), index=True)
        yearly_cost_results.to_csv(os.path.join(save_path, "Yearly_Costs_By_Component.csv"), index=True)

        logger.info(f"Results saved to {save_path}")

    return results
