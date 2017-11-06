var LocalDatabase= (function() {
	var KEY_USER='$USER';
	var KEY_SETTING='$SETTING';
	var KEY_SHOPID='$SHOPID';
	var KEY_ATTACHMENTS='$ATTACHMENTS';
	var KEY_FAULT='$FAULT';
	var KEY_FAULT_DEVICES='$FAULT_DEVICES';
	var KEY_DICTIONARY='$DICTIONARY';
	var KEY_WAY_SECTIONS='$WAY_SECTIONS';
	var KEY_WAY_SECTIONS_COMPANY='$WAY_SECTIONS_COMPANY';
	var KEY_INSPECT_LOCATION="$KEY_INSPECT_LOCATION";
	var KEY_CLEAN_LOCATION="$KEY_CLEAN_LOCATION";
	var KEY_FORM_CHECK="$KEY_FORM_CHECK";
	var KEY_TEMPORAYR_INSPECTION="$KEY_TEMPORAYR_INSPECTION";//临时修改巡检情况的保存
	var KEY_SHOPCOLLECT='$SHOPCOLLECT';
	var KEY_SHOPPRODUCTCOLLECT='$SHOPPRODUCTCOLLECT';
	function _getDatas(KEY){
		var jsonText = localStorage.getItem(KEY) || "[]";
		var datas=JSON.parse(jsonText);
		return datas;
	}	
	function _setDatas(KEY,datas){
		localStorage.setItem(KEY, JSON.stringify(datas));			
	}
	function _getData(KEY){
		var jsonText = localStorage.getItem(KEY) || "{}";
		var datas=JSON.parse(jsonText);
		return datas;
	}
	function _setData(KEY,data){
		localStorage.setItem(KEY, JSON.stringify(data));		
	}
	function _getPagination(datas,pageSize,currentPageIndex){		
		//总记录数
        var recordCount = datas.length;
        //开始索引
        var start = pageSize * (currentPageIndex - 1);//0
        var end = pageSize * currentPageIndex;
        //总页数
        var pageCount = recordCount % pageSize == 0 ? recordCount / pageSize : Math.ceil(recordCount / pageSize);
        if (end > recordCount) {
            end = recordCount;
        }
        var ret = [];
        for (var i = start; i < end; i++) {
            ret.push(datas[i]);
        }
        return {isEnd:(currentPageIndex>=pageCount),pageSize:pageSize,currentPageIndex:currentPageIndex,recordCount:recordCount,pageCount:pageCount,data:ret};
	}
	//获得一个数据字典列表
	function _getDictionarys(category){
		var datas=_getDatas(KEY_DICTIONARY);
		var ret=[];
		for(var i=0;i<datas.length;i++){
			if(datas[i].key==category)	{
				ret= datas[i].value;
				break;
			}
		}
		return ret;
	}
	//设置一个数据字典列表
	function _setDictionarys(category,dicts){
		var datas=_getDatas(KEY_DICTIONARY);
		var isExists=false;
		for(var i=0;i<datas.length;i++){
			if(datas[i].key==category){
				datas[i].value=dicts;
				isExists=true;
				break;
			}
		}
		if(!isExists){
			datas.push({key:category,value:dicts});
		}
		_setDatas(KEY_DICTIONARY,datas);
	}
		
	var db=function(){
		//设置本地用户信息
		this.setUser=function(user){
			_setData(KEY_USER,user||{});
		};
		//获取本地用户信息
		this.getUser=function(){
			return _getData(KEY_USER);
		};		
		//保存用户配置
		this.setSetting = function(setting) {
			_setData(KEY_SETTING,setting||{});
		};
		//获取用户配置
		this.getSetting = function() {
			return _getData(KEY_SETTING);
		};
		
		//保存shopid
		this.setShopId = function(shopid) {
			_setData(KEY_SHOPID,shopid||{});
		};
		//获取shopid
		this.getShopId = function() {
			return _getData(KEY_SHOPID);
		};
		
		//保存收藏店铺列表
		this.setShopCollect = function(ShopCollects) {
			_setDatas(KEY_SHOPCOLLECT,ShopCollects||[]);
		};
		//获取收藏店铺列表
		this.getShopCollect = function() {
			return _getDatas(KEY_SHOPCOLLECT);
		};
		//保存床位店铺列表
		this.setShopProductCollect = function(ShopProductCollects) {
			_setDatas(KEY_SHOPPRODUCTCOLLECT,ShopProductCollects||[]);
		};
		//获取床位店铺列表
		this.getShopProductCollect = function() {
			return _getDatas(KEY_SHOPPRODUCTCOLLECT);
		};
		//设置用户对应的路段
		this.setWaySections= function(sections){
			var datas=_getDatas(KEY_WAY_SECTIONS);
			var isExists=false;
			for(var i=0;i<datas.length;i++){
				if(datas[i].key==this.getUser().Userid){
					datas[i].value=sections;
					isExists=true;
					break;
				}
			}
			if(!isExists){
				datas.push({key:this.getUser().Userid,value:sections});
			}
			_setDatas(KEY_WAY_SECTIONS,datas);
		};
		//得到用户对应的路段
		this.getWaySections=function(){
			var datas=_getDatas(KEY_WAY_SECTIONS);
			var ret=[];
			for(var i=0;i<datas.length;i++){
				if(datas[i].key==this.getUser().Userid){
					ret=datas[i].value;
					break;
				}
			}
			return ret;
		};
		//设置路段对应的代维单位
		this.setWaySectionCompany=function(sectionId,companys){
			var datas=_getDatas(KEY_WAY_SECTIONS_COMPANY);
			var isExists=false;
			for(var i=0;i<datas.length;i++){
				if(datas[i].key==sectionId){
					datas[i].value=companys;
					isExists=true;
					break;
				}
			}
			if(!isExists){
				datas.push({key:sectionId,value:companys});
			}
			_setDatas(KEY_WAY_SECTIONS_COMPANY,datas);
		};
		//得到路段对应的代维单位
		this.getWaySectionCompany=function(sectionId){
			var datas=_getDatas(KEY_WAY_SECTIONS_COMPANY);
			var ret=[];
			for(var i=0;i<datas.length;i++){
				if(datas[i].key==sectionId){
					ret=datas[i].value;
					break;
				}
			}
			return ret;
		}
		//设置故障类型数据字典
		this.setFaultTypes=function(faultTypes){
			_setDictionarys('FAULT_TYPE',faultTypes);
		};
		//得到故障类型数据字典
		this.getFaultTypes=function(){
			return _getDictionarys('FAULT_TYPE');
		};
		
		//设置故障类型数据字典
		this.setFaultLevels=function(faultLevels){
			_setDictionarys('FAULT_LEVEL',faultLevels);
		};
		//得到故障类型数据字典
		this.getFaultLevels=function(){
			return _getDictionarys('FAULT_LEVEL');
		};
		//设置故障所属系统
		this.setMachineSystem=function(systems){
			_setDictionarys('FAULT_MACHINE_SYSTEM',systems);
		};
		//获取故障所属系统
		this.getMachineSystem=function(){
			return _getDictionarys('FAULT_MACHINE_SYSTEM');
		};
		//得到报修情况选项
		this.getToDepartments=function(){
			return [{id:"已报现场维修员",name:"已报现场维修员"},{id:"已报维护网点",name:"已报维护网点"},{id:"已报业主营运管理部",name:"已报业主营运管理部"}];
		};
		//得到本地故障单列表
		this.getFaults=function(userId,pageSize,currentPageIndex){
			var items=[];
			var faults=_getDatas(KEY_FAULT);
			for(var i=0;i<faults.length;i++){
				if(faults[i].ADDUID==userId && !faults[i]._is_upload_server){
					items.push(faults[i]);
				}
			}
			return _getPagination(items,pageSize,currentPageIndex);
		};
		//保存设备故障到本地
		this.setFault=function(fault,devices,attachments){
//			console.log("attachments==="+JSON.stringify(attachments));
			var faults=_getDatas(KEY_FAULT);
			for(var i=0;i<faults.length;i++){
				if(faults[i].FAULTID==fault.FAULTID){
					faults.splice(i, 1); 
					break;
				}
			}
			faults.splice(0, 0, fault); 
			_setDatas(KEY_FAULT,faults);
			this.setFaultDevices(fault.FAULTID,devices);
			this.setAttachments(fault.FAULTID,"Fault",attachments);
		};		
		//删除本地故障单
		this.deleteFault=function(dataId){
			try{				
				var attachments=_getDatas(KEY_ATTACHMENTS);
				for(var i=attachments.length-1;i>=0;i--){
					if(attachments[i]._local_data_id==dataId && attachments[i]._is_upload_server){
						attachments.splice(i, 1); 
					}
				}
				_setDatas(KEY_ATTACHMENTS,attachments);
				return true;
			}catch(e)
			{
				return false;
			}
		};
		//得到设备故障单
		this.getFault=function(dataId){
			var item={};
			var faults=_getDatas(KEY_FAULT);
			for(var i=0;i<faults.length;i++){
				if(faults.FAULTID==dataId){
					item= faults[i];
					break;
				}
			}
			return item;
		};
		//得到故障设备列表
		this.getFaultDevices=function(dataId){
			var items=[];
			var datas=_getDatas(KEY_FAULT_DEVICES);
			for(var i=0;i<datas.length;i++){
				if(datas[i]._local_data_id==dataId){
					items.push(datas[i]);
				}
			}
			return items;
		};
		//保存故障设备列表
		this.setFaultDevices=function(dataId,devices){
			var datas=_getDatas(KEY_FAULT_DEVICES);
			if(datas.length > 0){
				for(var i=datas.length-1;i>=0;i--){
					if(datas[i]._local_data_id==dataId){
						datas.splice(i,1);
					}
				}
			}
			devices=devices||[];
			for(var i=0;i<devices.length;i++){
				datas.push(devices[i]);
			}
			_setDatas(KEY_FAULT_DEVICES,datas);
		}
		//保存附件
		this.setAttachments=function(dataId,type,attachments){
//			console.log('type++++'+type+'+++++dataid+++'+dataId);
			var datas=_getDatas(KEY_ATTACHMENTS);
			if(datas.length > 0){
				for(var i=datas.length-1;i>=0;i--){
					if(datas[i]._local_data_id==dataId && datas[i].type==type){
						datas.splice(i,1);
						continue;
					}
//					console.log("保存附件到本地==="+datas[i]._local_data_id+";"+type);
				}
			}
			attachments=attachments||[];
			for(var i=0;i<attachments.length;i++){
//				console.log("保存附件到本地===");
				
				datas.push(attachments[i]);
			}
//			console.log('datas+++set++'+JSON.stringify(datas));
			_setDatas(KEY_ATTACHMENTS,datas);	
		};
		
		//删除上传成功的附件
		this.deleteAttachments=function(dataId,type,attachments,attId){
//			console.log("APPPPP");
			var datas=_getDatas(KEY_ATTACHMENTS);
			if(datas.length>0){
//				console.log('+++++++++所有附件本地+++++++++++++++++++'+JSON.stringify(datas[1]))
				for(var i=0;i<datas.length;i++){
					if(datas[i].att_id == attId){
						datas.splice(i,1);
//						console.log("删除本地上传成功的附件datas==="+i);
						break;
					}
				}
			}
//			console.log('datas+++set++'+JSON.stringify(datas));
			_setDatas(KEY_ATTACHMENTS,datas);	
		};
		//得到附件
		this.getAttachments=function(dataId,type){
//			console.log('type++++'+type+'+++++dataid+++'+dataId);
			var datas=_getDatas(KEY_ATTACHMENTS);	
//			console.log("datas+++get"+JSON.stringify(datas));
			var items=[];
			for(var i=0;i<datas.length;i++){
				if(datas[i]._local_data_id==dataId && datas[i].type==type){
					items.push(datas[i]);
				}
			}
			return items;
		};
             
		
		//从新给附件赋值  zq 定义
		this.outSetDatas=function(datas){
			_setDatas(KEY_ATTACHMENTS,datas);	
		}
		//保存表单到本地数据库
		this.outSetCheckForm=function(datas){
			_setDatas(KEY_FORM_CHECK,datas);
		}
		this.outGetCheckForm=function(){
			var items=[];
			items=_getDatas(KEY_FORM_CHECK);
			return items;
		}
		//临时巡检里面的巡检数据保存到本地
		this.setTemporaryInspection=function(datas){
			_setDatas(KEY_TEMPORAYR_INSPECTION,datas);
		}
		this.getTemporaryInspection=function(){
			var items=[];
			items=_getDatas(KEY_TEMPORAYR_INSPECTION);
			return items;
		}
		
		
		
		//巡检签到
		this.setInspectSign=function(inspectId,userId,lng,lat,address){
			var datas=_getDatas(KEY_INSPECT_LOCATION);
			var item={INSPECTRID:inspectId,SIGNTIME:(new Date()).Format("yyyy-MM-dd hh:mm:ss"),USERID:userId,LONGITUDE:lng,LATITUDE:lat,ADDRESS:address,IsLocal:true};
			datas.push(item);
			_setDatas(KEY_INSPECT_LOCATION,datas);	
		};
		//
		this.getInspectSigns=function(inspectId){
			var datas=_getDatas(KEY_INSPECT_LOCATION);
			var items=[];
			for(var i=0;i<datas.length;i++){
				if(datas[i].INSPECTRID==inspectId){
					items.push(datas[i]);
				}
			}
			return items;
		};
		this.deleteInspectSign=function(inspectId,userId,time){			
			var datas=_getDatas(KEY_INSPECT_LOCATION);		
			if(datas.length > 0){
				for(var i=datas.length-1;i>=0;i--){
					if(datas[i].INSPECTRID==inspectId && datas[i].USERID==userId && datas[i].SIGNTIME==time){
						datas.splice(i,1);
					}
				}
			}
			_setDatas(KEY_INSPECT_LOCATION,datas);	
		};
		this.updateDatabase=function(){
//			localStorage.removeItem("IS_UPDATED_DATABASE");
//			return;
//	console.log(JSON.stringify(_getDatas(KEY_ATTACHMENTS)));
//	return;
			var isUpdated = !!localStorage.getItem("IS_UPDATED_DATABASE");
			if(!isUpdated){
				//升级本地数据库结构
				//2016-11-7 附件表增加type字段，值为fault
				var datas=_getDatas(KEY_ATTACHMENTS);
			
				for(var i=0;i<datas.length;i++){
					datas[i].type=="Fault"
				}
				_setDatas(KEY_ATTACHMENTS,datas);	
			}
			localStorage.setItem("IS_UPDATED_DATABASE",true);
		}
		
		//设置巡检检查结果数据字典
		this.setInspectResultTypes=function(inspectResultTypes){
			_setDictionarys('INSPECT_RESULT_TYPE',inspectResultTypes);
		};
		//得到巡检检查结果数据字典
		this.getInspectResultTypes=function(){
			return _getDictionarys('INSPECT_RESULT_TYPE');
		};
		
		
		//保洁签到
		this.setCleanSign=function(cleanrId,userId,lng,lat,address){
			var datas=_getDatas(KEY_CLEAN_LOCATION);
			var item={CLEANRID:cleanrId,SIGNTIME:(new Date()).Format("yyyy-MM-dd hh:mm:ss"),USERID:userId,LONGITUDE:lng,LATITUDE:lat,ADDRESS:address,IsLocal:true};
			datas.push(item);
			_setDatas(KEY_CLEAN_LOCATION,datas);	
		};
		//
		this.getCleanSigns=function(cleanrId){
			var datas=_getDatas(KEY_CLEAN_LOCATION);
			var items=[];
			for(var i=0;i<datas.length;i++){
				if(datas[i].CLEANRID==cleanrId){
					items.push(datas[i]);
				}
			}
			return items;
		};
		this.deleteCleanSign=function(cleanrId,userId,time){			
			var datas=_getDatas(KEY_CLEAN_LOCATION);		
			if(datas.length > 0){
				for(var i=datas.length-1;i>=0;i--){
					if(datas[i].CLEANRID==cleanrId && datas[i].USERID==userId && datas[i].SIGNTIME==time){
						datas.splice(i,1);
					}
				}
			}
			_setDatas(KEY_CLEAN_LOCATION,datas);	
		};
	}
	return db;
})();
