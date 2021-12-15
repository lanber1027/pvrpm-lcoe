Search.setIndex({docnames:["api/modules","api/pvrpm","api/pvrpm.core","api/pvrpm.core.modules","example_pvrpm_config","index","tutorial_assumptions_limitations","tutorial_getting_started","tutorial_installation","tutorial_logic_diagram"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":3,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":3,"sphinx.domains.rst":2,"sphinx.domains.std":2,"sphinx.ext.viewcode":1,sphinx:56},filenames:["api/modules.rst","api/pvrpm.rst","api/pvrpm.core.rst","api/pvrpm.core.modules.rst","example_pvrpm_config.rst","index.rst","tutorial_assumptions_limitations.rst","tutorial_getting_started.rst","tutorial_installation.rst","tutorial_logic_diagram.rst"],objects:{"":{pvrpm:[1,0,0,"-"]},"pvrpm.core":{"case":[2,0,0,"-"],components:[2,0,0,"-"],enums:[2,0,0,"-"],exceptions:[2,0,0,"-"],logger:[2,0,0,"-"],modules:[3,0,0,"-"],simulation:[2,0,0,"-"],utils:[2,0,0,"-"]},"pvrpm.core.case":{SamCase:[2,1,1,""]},"pvrpm.core.case.SamCase":{__getstate__:[2,2,1,""],__setstate__:[2,2,1,""],base_case_sim:[2,2,1,""],output:[2,2,1,""],precalculate_tracker_losses:[2,2,1,""],simulate:[2,2,1,""],value:[2,2,1,""]},"pvrpm.core.components":{Components:[2,1,1,""]},"pvrpm.core.components.Components":{ac_availability:[2,2,1,""],compound_failures:[2,2,1,""],current_degradation:[2,2,1,""],dc_availability:[2,2,1,""],initialize_components:[2,2,1,""],snapshot:[2,2,1,""],summarize_failures:[2,2,1,""],tracker_power_loss:[2,2,1,""],update_fails:[2,2,1,""],update_indep_monitor:[2,2,1,""],update_labor_rates:[2,2,1,""],update_monitor:[2,2,1,""],update_repairs:[2,2,1,""]},"pvrpm.core.enums":{ConfigKeys:[2,1,1,""]},"pvrpm.core.enums.ConfigKeys":{BASE:[2,3,1,""],CAN_FAIL:[2,3,1,""],CAN_MONITOR:[2,3,1,""],CAN_REPAIR:[2,3,1,""],COMBINER:[2,3,1,""],COMBINER_PER_INVERTER:[2,3,1,""],COMP_FUNC:[2,3,1,""],COMP_MONITOR:[2,3,1,""],COMP_PARAM:[2,3,1,""],CONF_INTERVAL:[2,3,1,""],CONST:[2,3,1,""],COST:[2,3,1,""],COST_PER_WATT:[2,3,1,""],DAYS:[2,3,1,""],DECAY_FRAC:[2,3,1,""],DEGRADE:[2,3,1,""],DISCONNECT:[2,3,1,""],DIST:[2,3,1,""],EXPON:[2,3,1,""],FAILURE:[2,3,1,""],FAIL_PER_THRESH:[2,3,1,""],FAIL_THRESH:[2,3,1,""],FRAC:[2,3,1,""],GRID:[2,3,1,""],INDEP_MONITOR:[2,3,1,""],INFLATION:[2,3,1,""],INTERVAL:[2,3,1,""],INVERTER:[2,3,1,""],INVERTER_PER_TRANS:[2,3,1,""],INVERTER_SIZE:[2,3,1,""],LABOR:[2,3,1,""],LABOR_RATE:[2,3,1,""],LEVELS:[2,3,1,""],LIFETIME_YRS:[2,3,1,""],LINEAR:[2,3,1,""],LOG:[2,3,1,""],LOGNORM:[2,3,1,""],MEAN:[2,3,1,""],MODULE:[2,3,1,""],MODULES_PER_STR:[2,3,1,""],MODULE_ORDER:[2,3,1,""],MONITORING:[2,3,1,""],MULTI_SUBARRAY:[2,3,1,""],NAME:[2,3,1,""],NORMAL:[2,3,1,""],NUM_COMBINERS:[2,3,1,""],NUM_COMPONENT:[2,3,1,""],NUM_REALIZATION:[2,3,1,""],NUM_TRACKERS:[2,3,1,""],NUM_TRANSFORMERS:[2,3,1,""],PARAM:[2,3,1,""],PARTIAL_FAIL:[2,3,1,""],PARTIAL_REPAIR:[2,3,1,""],REPAIR:[2,3,1,""],RESULTS_FOLDER:[2,3,1,""],SHAPE:[2,3,1,""],SLOPE:[2,3,1,""],STD:[2,3,1,""],STEP:[2,3,1,""],STRING:[2,3,1,""],STR_PER_COMBINER:[2,3,1,""],THRESH:[2,3,1,""],TRACKER:[2,3,1,""],TRACKING:[2,3,1,""],TRANSFORMER:[2,3,1,""],UNIFORM:[2,3,1,""],WARRANTY:[2,3,1,""],WEIBULL:[2,3,1,""],WORST_TRACKER:[2,3,1,""],component_keys:[2,3,1,""],compound_funcs:[2,3,1,""],compound_keys:[2,3,1,""],compound_levels:[2,3,1,""],dists:[2,3,1,""],failure_keys:[2,3,1,""],indep_monitor_keys:[2,3,1,""],losses:[2,3,1,""],monitoring_keys:[2,3,1,""],needed_keys:[2,3,1,""],partial_failure_keys:[2,3,1,""],partial_repair_keys:[2,3,1,""],repair_keys:[2,3,1,""],required_modules:[2,3,1,""],unusable_lcoe_calcs:[2,3,1,""]},"pvrpm.core.exceptions":{CaseError:[2,4,1,""]},"pvrpm.core.logger":{init_logger:[2,5,1,""]},"pvrpm.core.modules":{failure:[3,0,0,"-"],monitor:[3,0,0,"-"],repair:[3,0,0,"-"]},"pvrpm.core.modules.failure":{Failure:[3,1,1,""],PartialFailure:[3,1,1,""],TotalFailure:[3,1,1,""]},"pvrpm.core.modules.failure.Failure":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.modules.failure.PartialFailure":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.modules.failure.TotalFailure":{initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.modules.monitor":{CrossLevelMonitor:[3,1,1,""],IndepMonitor:[3,1,1,""],LevelMonitor:[3,1,1,""],Monitor:[3,1,1,""]},"pvrpm.core.modules.monitor.CrossLevelMonitor":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""],update_bins:[3,2,1,""]},"pvrpm.core.modules.monitor.IndepMonitor":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""],update_labor_rate:[3,2,1,""]},"pvrpm.core.modules.monitor.LevelMonitor":{initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.modules.monitor.Monitor":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.modules.repair":{PartialRepair:[3,1,1,""],Repair:[3,1,1,""],TotalRepair:[3,1,1,""]},"pvrpm.core.modules.repair.PartialRepair":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.modules.repair.Repair":{__init__:[3,2,1,""],initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""],update_labor_rate:[3,2,1,""]},"pvrpm.core.modules.repair.TotalRepair":{initialize_components:[3,2,1,""],reinitialize_components:[3,2,1,""],update:[3,2,1,""]},"pvrpm.core.simulation":{cf_interval:[2,5,1,""],gen_results:[2,5,1,""],graph_results:[2,5,1,""],pvrpm_sim:[2,5,1,""],run_system_realization:[2,5,1,""],simulate_day:[2,5,1,""]},"pvrpm.core.utils":{component_degradation:[2,5,1,""],filename_to_module:[2,5,1,""],get_higher_components:[2,5,1,""],getattr_override:[2,5,1,""],load_pysam_modules:[2,5,1,""],sample:[2,5,1,""],summarize_dc_energy:[2,5,1,""]},pvrpm:{core:[2,0,0,"-"]}},objnames:{"0":["py","module","Python module"],"1":["py","class","Python class"],"2":["py","method","Python method"],"3":["py","attribute","Python attribute"],"4":["py","exception","Python exception"],"5":["py","function","Python function"]},objtypes:{"0":"py:module","1":"py:class","2":"py:method","3":"py:attribute","4":"py:exception","5":"py:function"},terms:{"0":[2,4,7],"07":4,"1":[2,4,7],"10":[4,7],"100":[4,7],"1000":4,"100000":[4,7],"1095":[4,7],"12":7,"1200":[4,7],"14":[4,7],"1460":[4,7],"15":4,"1500":[4,7],"182":4,"1825":[4,7],"2":[2,4,7],"20":[4,7],"2000":4,"25":[4,7],"3":[4,7,8],"30":[2,4],"322":[4,7],"32868":4,"3477":4,"35":4,"365":[4,7],"3650":[4,7],"4":[4,7],"5":[4,7],"50":7,"500":4,"50000":[4,7],"60":[4,7],"64":4,"7":[4,7],"730":4,"7300":4,"75":4,"8":[4,8],"90":[4,7],"976":4,"98":2,"99":4,"abstract":3,"case":[0,1,3,4,5,8],"class":[2,3],"const":2,"default":[],"do":[4,7],"enum":[0,1,5],"export":[2,5],"final":7,"float":[2,3,4],"function":[2,4,7,9],"import":2,"int":[2,3],"long":[4,7],"new":[2,3,7],"return":[2,3],"static":[2,3,4,7],"true":[2,4,7],"while":4,A:[2,4,5,7],AT:4,As:4,BEING:4,By:5,FOR:4,For:[3,4,7],If:[2,4,7,8],In:[4,5,7],It:[5,7],NOT:4,Not:7,ONE:4,OR:[4,7],On:7,The:[2,3,4,5,7,8],Then:7,There:7,These:[4,7],To:7,With:7,__getstate__:2,__init__:3,__setstate__:2,abc:3,abil:5,abl:6,abov:[4,7],ac:2,ac_avail:2,ac_loss:2,account:2,accru:3,accur:[5,7],across:[3,4,5],action:7,actual:5,ad:2,affect:[4,7],after:4,alert:7,algorithm:[4,7],alik:5,all:[2,3,4,7],all_monitor:4,all_repair:[4,7],allow:[4,5,7],along:[4,7],alongsid:[4,5,7],alpha:2,alreadi:[4,7,8],also:[2,4,5,7],alwai:7,among:7,amount:[2,4,7],an:[2,3,4,5,7],analysi:5,ani:[2,4,7,8],annual_ac_inv_clip_loss_perc:2,annual_ac_inv_eff_loss_perc:2,annual_ac_inv_pnt_loss_perc:2,annual_ac_inv_pso_loss_perc:2,annual_ac_perf_adj_loss_perc:2,annual_dc_diodes_loss_perc:2,annual_dc_mismatch_loss_perc:2,annual_dc_module_loss_perc:2,annual_dc_mppt_clip_loss_perc:2,annual_dc_nameplate_loss_perc:2,annual_dc_optimizer_loss_perc:2,annual_dc_perf_adj_loss_perc:2,annual_dc_tracking_loss_perc:2,annual_dc_wiring_loss_perc:2,annual_poa_cover_loss_perc:2,annual_poa_shading_loss_perc:2,annual_poa_soiling_loss_perc:2,annual_transmission_loss_perc:2,annual_xfmr_loss_perc:2,anoth:4,anyth:[4,7],apart:3,appear:7,appli:7,applic:2,ar:[2,3,4,5,7,9],arbitrari:7,arc:7,aren:4,argument:7,around:[2,4,7],arrai:[2,3],assumpt:5,attent:7,attr:2,attributeerror:2,avail:[2,3,4,5,7],avail_downtim:2,averag:2,avoid:2,backslash:[4,7],bar:[2,7],base:[2,3,5,7],base_case_sim:2,basic:7,becaus:[2,7],been:2,befor:[2,4,5,7],begin:[4,9],behavior:[],being:[4,7],below:[4,7],benefici:5,benefit:2,beta:4,between:[2,7],bit:7,bool:2,both:[4,5,7],box:[4,7],build:8,built:[4,7],c:4,calcul:[2,4,5,7],callback:2,can:[2,4,5,7,8],can_fail:[2,4,7],can_monitor:[2,4,7],can_repair:[2,4,7],carefulli:[4,7],caseerror:2,cashloan:[4,7],catastrophic_failur:4,catastrophic_repair:4,cd:8,cell_failur:[4,7],cell_repair:[4,7],cent:4,certain:[],cf_interv:2,chang:[2,3,4],check:[2,3,4,7],choos:7,chosen:[4,7],clear:4,click:7,clone:8,close:4,code:7,coeffici:2,column:[2,7],com:8,combin:[2,4,7],combiner_per_invert:2,come:4,command:7,comment:[4,7],comp:[2,3],comp_func:2,comp_level_df:3,comp_monitor:2,comp_param:2,compar:5,complet:[2,3,7],complex:7,compoent:2,compon:[0,1,3,4,5,9],componenet:[4,7],component_degrad:2,component_failur:4,component_kei:2,component_level:[2,4],component_level_monitor:[2,4,7],component_monitor:4,component_repair:4,componet:[],compoun:[4,7],compound:[2,4,7],compound_failur:2,compound_func:2,compound_kei:2,compound_level:2,compound_paramet:[2,4],compounding_funct:[2,4],comput:7,concurr:[4,7],concurrent_failur:[2,4,7],concurrent_repair:[2,4,7],conf_interv:[2,4,7],confid:[2,4,7],config:[2,4,7],configkei:2,configur:[2,5],consist:7,constant:2,consult:7,consum:5,contain:[2,3,4,7],content:[0,5],contribut:4,control:7,convent:7,convert:[2,4,7],copi:2,core:[0,1,5,7],correct:7,correspond:[2,3,7],cost:[2,3,4,5,7],cost_per_watt:[2,4],count:[2,4,7],countdown:[4,7],cours:[],cover:[7,8],cpu:7,creat:[2,4,5,7],creation:9,cross:[2,3,4,7],crosslevelmonitor:3,csv:[2,7],cumulative_failur:2,cumulative_oow_failur:2,current:[2,3,4,7],current_degrad:2,dai:[2,3,4,7,9],daili:2,data:[2,3,7],datafram:[2,3],days_of_degrad:2,dc:[2,3,4,7],dc_avail:[2,3],dc_net:2,dc_power_output:2,debug:2,decai:[4,7],decay_frac:2,decay_fract:[2,4,7],decim:2,decreas:[3,7],defect:[2,4,7],defective_failur:[2,4,7],defective_monitor:4,defin:[2,3,4,5,7],degrad:[2,4],degradation_factor:2,depend:[4,7],describ:[3,9],design:7,desir:2,detail:[4,7],detect:[2,3,4,7],determin:[2,7],deviat:[2,4,7],df:[2,3],diagram:[5,7],dict:[2,3],dictat:7,dictionari:[2,3],differ:[3,5,7],directori:7,disabl:7,disconnect:[2,4,7],displai:2,dist:2,distribut:[2,4,5],doc:[4,8],document:[4,7,8],doe:2,doesn:[4,7],doesnt:[4,7],dollar:[4,7],don:7,done:[2,4,5,7],doubl:2,down:[4,7],download:[7,8],drawn:7,drone:[4,7],drone_ir2:[4,7],drone_ir3:[4,7],drone_ir:[4,7],drop:[4,7],due:2,dure:[2,3],dynam:2,e:4,each:[2,3,4,7,9],easi:7,econom:5,effect:7,effici:[5,6],either:[4,7],elig:2,empti:7,en:[4,7],end:7,energi:2,enhanc:7,enough:[4,7],enter:4,entir:7,eol_failur:7,equal:[2,4],error:[2,4],escap:[4,7],essenti:5,etc:[5,7],even:7,event:7,everi:[2,3,4,7],exampl:7,except:[0,1,4,5,7],execut:[2,4,7],exist:[4,7],explain:7,explor:7,expon:2,exponenti:[2,4,7],extra:4,extract:2,extrem:4,factor:[2,4,7],fail:[2,3,4,7],fail_mod:3,fail_per_thresh:2,fail_thresh:2,failur:[1,2,4,5],failure_by_type_n:2,failure_kei:2,failure_per_threshold:[2,4,7],failure_typ:2,fall:7,fals:[2,4,7],far:2,faster:7,few:[5,6,7],file:[2,4,5,7,8],filenam:2,filename_to_modul:2,fill:5,financi:[4,7],find:[2,5,7],finish:7,first:[2,7],fix:[4,7],folder:[2,4,7],follow:[2,4,7],found:2,frac:2,fraction:[2,4,7],frame:[2,3],frequenc:2,from:[2,4,5,7,8],fsec:8,full:[2,7],further:7,g:4,gamma:4,gen_result:2,gener:[2,7],get:[2,4,5],get_higher_compon:2,getattr:2,getattr_overrid:2,git:8,github:8,give:[2,7,9],given:2,global:[2,4,7],global_threshold:[2,4,7],go:[4,7],goe:7,gov:8,graph:[2,7],graph_result:2,greater:2,grid:[2,4,7],gui:[5,7],h:7,ha:[2,4,7,9],half:4,handl:9,happen:[4,7,9],has_multiple_subarrai:2,have:[2,3,4,7],haven:8,heavili:7,help:7,here:[4,7,8,9],higher:[4,7],hit:2,hood:[4,7],hour:[2,4,7],hourli:2,how:[2,3,4,5,7,9],howev:[4,7],html:[4,7,8],http:[4,7,8],i:[4,7],idea:5,ignor:4,imag:7,immedi:7,implement:[4,5],includ:[2,4],incorrect:7,increment:[2,3],incur:7,indep:[4,7],indep_monitor:[2,3,4,7],indep_monitor_kei:2,independ:[2,3,4,7],indepmonitor:3,index:[2,5],indici:2,individu:2,inflat:[2,4,7],inform:[3,4,5,7],init:[2,3,9],init_logg:2,initi:9,initialize_compon:[2,3],input:[2,4,7],instal:[2,5],instanc:3,instantli:7,instead:[2,3,4,7],interfac:7,intern:2,interv:[2,4,7],invert:[2,4,7],inverter_per_tran:2,inverter_s:[2,4],io:[4,7],ir:[4,7],is_tracking_system:2,its:[2,3,5,7],json:[2,4,7],k:[4,7],keep:7,kei:[2,4,7],keyword:7,know:7,kw:2,kwarg:[2,4,7],kwh:2,labor:[2,3,4,7],labor_r:2,labor_tim:[2,4,7],lambda:[4,7],larg:[4,7],last:2,lcoe:[4,5,7,8],lcoefcr:2,learn:5,leav:[4,7],left:2,length:2,less:[2,7],level:[2,3,4,5],levelmonitor:3,life:7,lifespan:5,lifetim:[2,4,5,7],lifetime_yr:2,like:[2,4],limit:5,line:7,linear:2,linearli:2,linux:8,list:[2,3,4,7],ll:[4,7],load:2,load_pysam_modul:2,loader:2,locat:7,log:2,logger:[0,1,5],logic:[5,7],lognorm:[2,4,7],logorithm:2,longer:7,loss:[2,7],lost:2,lower:7,lowest:[],mac:8,made:5,mai:[3,4,7],maintain:[4,7],make:[6,7,8],mana:3,mani:[2,4,7],manual:[2,8],map:[2,3],margin:2,master:[4,7,8],match:4,mean:[2,4,7],meet:4,menu:7,messag:2,met:[4,7],method:[4,7],mind:7,misc_data:2,miss:7,misspel:7,mode:[2,3,4,7],model:[4,5,7],modifi:[3,7],modul:[0,4,5,9],module_ord:[2,4,7],modules_per_str:2,monitor:[1,2,4,5],monitor_tim:2,monitoring_kei:2,more:[4,5,7],most:[5,7],much:[2,4,7],multi_subarrai:2,multipl:7,multipli:4,multiprocess:2,must:[2,4,7],name:[2,3,4,7],name_modul:7,natur:7,neccesari:2,necessari:7,need:[2,4,5,7],needed_kei:2,never:[4,7],new_labor:2,next:[2,4,7],non:2,none:[2,3,8],normal:[2,3,4,7],normal_failur:4,normal_monitor:[4,7],note:[2,4,7],noth:7,notifi:[4,7],now:7,np:[2,3],nrel:[4,5,7,8],num_combin:[2,4,7],num_combiners_per_invert:2,num_compon:2,num_fail:2,num_failur:[4,7],num_inverters_per_transform:2,num_modules_per_str:2,num_real:[2,4,7],num_sampl:2,num_strings_per_combin:2,num_track:[2,4,7],num_transform:[2,4,7],number:[2,4,7],numpi:[2,3],obj:2,object:[2,3],obtain:[2,7],occur:[3,4,7],off:[2,7],offer:7,often:7,old:7,omit:4,onc:[2,3,4,7],one:[2,3,4,5,7],onli:[2,3,4,7],open:7,oper:[2,3,5,7],opposit:7,optim:[2,5],option:[2,3,4,7],order:[2,4,5,6],org:4,os:8,other:[2,3,4,7],otherwis:[2,4],out:2,outag:2,output:[2,4,7],outsid:7,over:7,overal:[2,7],overrid:4,overridden:7,own:[2,3],packag:[0,5],page:[4,7],pai:7,panda:[2,3],paral:2,parallel:[4,7],param:2,paramet:[2,3,4,7],part:[4,7],partial:[3,7],partial_fail:2,partial_failure_kei:2,partial_repair:2,partial_repair_kei:2,partialfailur:3,partialrepair:3,particular:2,path:[2,4,7],pd:[2,3],peopl:[4,7],per:[2,3,4,7],percent:[2,4,7],percent_per_dai:2,percentag:2,perform:[2,3,5],phase:4,photovolta:[5,7,8],pick:7,pickl:2,pip:8,pkgutil:2,place:[2,3,7],plant:5,pleas:[4,5,7],point:[4,7],possibl:2,power:[2,4,5,7],practic:4,precalculate_tracker_loss:2,preced:4,present_day_labor_r:[2,4,7],pretti:[],produc:5,product:2,program:2,progress:2,progress_bar:2,propag:2,properli:[2,4,7],provid:[2,4,5,7],put:7,pv:[4,5,7],pvrpm:[4,8],pvrpm_sim:2,pvsamv1:[2,4,7],py3:8,py:8,pybind:2,pypvrpm:5,pysam:[2,4,7],python:[5,7,8],quick:7,quicker:4,quickest:7,rais:2,random:2,rate:[2,3,5],ratio:[],reach:[2,4,7],read:[4,7],readthedoc:[4,7],realist:[6,7],realiz:[2,3,4,7],realization_num:2,recap:[],recommend:8,reduc:[2,4,7],refer:4,reinit:[3,9],reiniti:9,reinitialize_compon:3,releas:8,reliabl:5,rememb:7,remov:[4,7],repair:[1,2,4,5,9],repair_kei:2,repair_mod:3,repair_tim:2,replac:[2,4,7],replic:7,report:4,repres:[2,4,7],represent:5,requir:[2,4,5,7,8],required_modul:2,reset:[4,7],resid:2,respect:4,rest:7,result:[2,4,7],results_fold:[2,4,7],rou:[],routin:7,routine_failur:[4,7],routine_repair:4,row:7,run:[2,4,5,6,9],run_system_r:2,s:[2,4,7],sam:[2,3,4,5,8],sam_json_dir:2,samcas:[2,3],same:[2,4,7],sampl:[2,4,7],save:[2,7],save_graph:2,save_path:2,save_result:2,scale:4,scan:4,scipi:[2,4,7],score:2,sdk:2,search:2,section:[4,7],see:[4,5,7],seed:2,seen:7,select:[4,7],separ:7,servic:4,set:[2,3,4,5,7,9],setup:[4,5,8],shape:[2,4,7],share:2,shorter:7,shortest:7,should:[2,3,4,7],show:7,signifi:[2,7],signific:2,similar:[2,7],similiar:3,similiarli:4,simpl:[],simpli:[4,7],simul:[0,1,3,4,5,6,9],simulate_dai:2,simultan:7,sinc:[2,4,7],singl:[4,7],size:[2,4],slope:2,smaller:[],snapshot:2,so:[2,4,7,8],softwar:5,solut:5,solv:4,some:[2,4,7],someth:7,sourc:[2,3],space:[4,7],specfi:4,specif:[2,3,4,5,7],specifi:[2,3,4,7],split:2,ssc:[2,7],standard:[2,4,7],start:[2,4,5],start_level:2,start_level_df:2,stat:[2,4,7],state:[2,3,4],std:[2,4,7],step:[2,7],still:4,str:[2,3,4],str_per_combin:2,straightforward:7,string:[2,4,7],structur:4,stuck:7,studi:7,submodul:[0,1,5],subpackag:[0,5],subtract:2,summar:2,summari:[2,4,7],summarize_dc_energi:2,summarize_failur:2,sun:7,support:[2,4,7],sure:7,system:[2,4,5,7],system_lifetime_yr:2,t:[2,4,7,8],tabl:7,tail:2,take:[2,4,7],taken:[5,7],techniqu:7,techno:5,tell:7,than:[5,7],thei:[4,7],them:[2,3,4,7],therefor:4,thi:[2,3,4,5,7,8],thing:3,think:7,those:[2,4,7],thread:[2,7],thresh:2,threshold:[2,4,7],throughout:[4,5,7],time:[2,3,4,7],time_left_on_warranti:2,time_to_detect:[2,7],time_to_failur:[2,7],time_to_repair:[2,7],timeseri:2,todo:6,togeth:7,too:2,tool:[5,8],top:[2,7],top_level:2,total:[2,3,4,7],total_compon:2,totalfailur:3,totalrepair:3,track:[2,3,4,7],tracker:[2,4,7],tracker_power_loss:2,transform:[2,4,7],travel:7,trigger:[4,7],tupl:2,turn:[2,7],tutori:[],two:[2,7],type:[2,3,4,7],typic:[2,4,7],unaffect:2,unclear:7,under:[4,7],underli:[2,3],understand:[5,9],uniform:[2,4,7],unintention:2,union:2,unknown:7,unlik:3,until:[2,4,7],unusable_lcoe_calc:2,up:[3,5,7],updat:[2,3,9],update_bin:3,update_fail:2,update_indep_monitor:2,update_labor_r:[2,3],update_monitor:2,update_repair:2,upper:7,us:[2,3,4,5,7,8],usabl:[4,7],usd:[4,7],use_worst_case_track:[2,4,7],user:[4,5],usual:7,util:[0,1,5],utilityrate5:[4,7],utiltii:[4,7],valid:[5,8],valu:[2,4,5,7],vari:5,variabl:2,variou:7,verbos:2,veri:4,verifi:2,via:3,view:[5,7],wa:2,wai:[2,5,7],walk_packag:2,want:[4,7,8],warranti:[2,3,4],watt:4,weather:5,websit:7,weibul:[2,4,7],weibull_distribut:4,weight:7,well:2,what:[4,7,9],wheel:8,whehter:2,when:[2,3,4,7],where:[2,3,4,7],whether:[2,7],which:[2,4,7],whl:8,why:[4,7],wiki:4,wikipedia:[4,7],window:[4,7,8],wire_repair:[4,7],wiring_failur:[4,7],without:2,won:7,wont:4,work:[2,3,4,5,7,8],worst:7,worst_track:2,would:[2,4],wrap:[4,7],wrapper:2,x64:8,x:8,xx:[4,7],yaml:[5,7],year:[2,4,7],yearli:2,you:[4,7,8],your:[4,5,7],z:2,zero:[2,3,7]},titles:["pvrpm","pvrpm package","pvrpm.core package","pvrpm.core.modules package","Example YAML Configuration","PVRPM\u2019s documentation","SAM/PVRPM Assumptions / Limitations","Getting Started","Installation","Logic Diagram"],titleterms:{"case":[2,7],"enum":2,"export":7,about:5,api:5,assumpt:6,behavior:7,compon:[2,7],configur:[4,7],content:[1,2,3],core:[2,3],diagram:9,distribut:7,document:5,exampl:[4,5],except:2,failur:[3,7],get:7,indic:5,instal:8,level:7,limit:6,logger:2,logic:9,modul:[1,2,3,7],monitor:[3,7],order:7,packag:[1,2,3],pvrpm:[0,1,2,3,5,6,7],repair:[3,7],run:7,s:5,sam:[6,7],setup:7,simul:[2,7],start:7,submodul:[2,3],subpackag:[1,2],tabl:5,tutori:5,util:2,warranti:7,yaml:4}})