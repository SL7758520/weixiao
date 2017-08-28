//HTML5本地数据库
//Chrome	3.0及以上版本	支持 
//FireFox	暂不支持 
//IE	暂不支持 
//Opera	10.5及以上版本	支持 
//Safari	3.2及以上版本支持	支持 
var Database= (function() { 
	function _initDatabase(){
		var _db = _getCurrentDatabase(); //初始化数据库
		if(!_db) {
			alert("您的浏览器版本太低，不支持HTML5本地数据库！无法使用离线功能！");
			return;
		}
		//本地故障记录表
		//必填：临时数据ID，创建时间，创建者ID，创建者姓名，部门ID，部门名称，公司ID，公司名称，路段ID，路段名称，故障位置，故障类型，发生时间，故障描述,是否上传服务器，上传时间
		//选填：正式数据ID，所属系统，保修情况，报修人，联系电话，代维单位ID（业主系统时必须指定），代维单位名称（业主系统时必须指定）
		var t_device_fault='create table if not exists device_fault('
				+'id text not null,add_time text not null,user_id text not null,user_name text not null,'
				+'dep_id text not null,dep_name text not null,company_id text not null,company_name text not null,'
				+'section_id text not null,section_name text not null,position_id text,position_name text not null,fault_type text not null,occur_time text not null,fault_description text not null,is_up_service int not null,up_time text,'
				+'sid text,sys_id text,to_dept text,up_user_name text,up_user_tel text,up_company_id text,up_company_name text)';
		//本地故障清单表
		//必填：创建时间,临时数据ID，设备ID，设备名称，数量
		var t_device_fault_list='create table if not exists device_fault_list('
				+'add_time text not null,data_id text not null,device_id text not null,device_name text not null,quantity int not null)';
		//本地附件表
		//必填：id，创建时间,临时数据ID，附件名称，附件路径，附件类型，附件大小
		var t_attachment = 'create table if not exists attachments(att_id text not null,add_time text not null,data_id TEXT not null,file_name TEXT not null,file_src TEXT not null,file_type TEXT not null,size int)';
		//integer PRIMARY KEY autoincrement
		//字典分类
		var t_dict_category='create table if not exists dict_category(category_id text,name text,sync_time text)';
		//字典
		var t_dict_detail='create table if not exists dict_detail(id text,category_id text,code text,name text,sort_code int,description text)';
		
		_db.transaction(function(trans) { //启动一个事务，并设置回调函数
			//执行创建表的Sql脚本
			//executeSql(sqlStatement, arguments, callback, errorCallback); 
			trans.executeSql(t_device_fault, [], function(trans, result) {},function(trans, message) {console.log(message);});
			trans.executeSql(t_device_fault_list, [], function(trans, result) {},function(trans, message) {console.log(message);});
			trans.executeSql(t_attachment, [], function(trans, result) {},function(trans, message) {console.log(message);});
			trans.executeSql(t_dict_category, [], function(trans, result) {},function(trans, message) {console.log(message);});
			trans.executeSql(t_dict_detail, [], function(trans, result) {},function(trans, message) {console.log(message);});
		});
	}
	function _getCurrentDatabase(){
		var _db = openDatabase("hmmp", "1.0", "本地数据库，保存离线使用的记录!", 1024 * 1024);;
		return _db;
	}
	
	//获得新ID
	function _getNewId(){
		var r = Math.random()*(999999-100000) + 100000;//12位随机数
		r = parseInt(r, 10);
		var time=new Date();
		var str="";
		str+=time.getFullYear();//年
		str+=time.getMonth()+1;//月 月比实际月份要少1
		str+=time.getDate();//日
		str+=time.getHours();//HH
		str+=time.getMinutes();//MM
		str+=time.getSeconds(); //SS
		return str + r; 
	}
	var db=function(){
		_initDatabase();
		this.getFaults=function(userId,pageSize,currentPageIndex,backcall){
			var faults={pageSize:pageSize,pageIndex:currentPageIndex,recordCount:0,isEnd:false,datas:[]};
			var _db = _getCurrentDatabase();
			_db.transaction(function(trans) {
				trans.executeSql("select *,(select count(1) from device_fault where user_id=? and is_up_service=0) as recordCount from device_fault where user_id=? and is_up_service=0 order by add_time desc limit ? offset ?", [userId,userId,pageSize,pageSize*(currentPageIndex-1)], function(ts, datas) {			
					if(datas.rows && datas.rows.length) {
						faults.recordCount=datas.rows[0].recordCount;
						faults.isEnd=(pageSize*(currentPageIndex-1)+datas.rows.length>=faults.recordCount);
						for(var i=0;i<datas.rows.length;i++){
							faults.datas.push({id:datas.rows[i].id,
								fault_type:datas.rows[i].fault_type,
								occur_time:datas.rows[i].occur_time,
								position_name:datas.rows[i].position_name,
								sys_id:datas.rows[i].sys_id,
								fault_description:datas.rows[i].fault_description});
						}						
					}
					if(backcall){
						backcall.call(this,faults);
					}
					//if( typeof(backcall) == 'function') backcall(data); 
				}, function(ts, message) {
					alert("获取故障处理列表时出错！");
				});
			});
		};
		//获得一个本地事故
		this.getFault=function(dataId,backcall){			
			var fault={};
			var _db = _getCurrentDatabase();
			_db.transaction(function(trans) {
				trans.executeSql("select * from device_fault where id=?", [dataId], function(ts, data) {			
					if(data.rows && data.rows.length) {
						fault.id=data.rows.item(0)['id'];
						fault.add_time=data.rows.item(0)['add_time'];
						fault.user_id=data.rows.item(0)['user_id'];
						fault.user_name=data.rows.item(0)['user_name'];
						fault.dep_id=data.rows.item(0)['dep_id'];
						fault.dep_name=data.rows.item(0)['dep_name'];
						fault.company_id=data.rows.item(0)['company_id'];
						fault.company_name=data.rows.item(0)['company_name'];
						fault.section_id=data.rows.item(0)['section_id'];
						fault.section_name=data.rows.item(0)['section_name'];
						fault.position_id=data.rows.item(0)['position_id'];
						fault.position_name=data.rows.item(0)['position_name'];
						fault.fault_type=data.rows.item(0)['fault_type'];
						fault.occur_time=data.rows.item(0)['occur_time'];
						fault.fault_description=data.rows.item(0)['fault_description'];
						fault.is_up_service=data.rows.item(0)['is_up_service'];
						fault.up_time=data.rows.item(0)['up_time'];
						fault.sid=data.rows.item(0)['sid'];
						fault.sys_id=data.rows.item(0)['sys_id'];
						fault.to_dept=data.rows.item(0)['to_dept'];
						fault.up_user_name=data.rows.item(0)['up_user_name'];
						fault.up_user_tel=data.rows.item(0)['up_user_tel'];
						fault.up_company_id=data.rows.item(0)['up_company_id'];
						fault.up_company_name=data.rows.item(0)['up_company_name'];						
					}
					if(backcall){
						backcall.call(this,fault);
					}
				}, function(ts, message) {
					alert("获取故障处理表时出错！");
				});
			});
		};
		//获得故障设备列表
		this.getFaultDevices=function(dataId,backcall){
			var faultDevices=[];
			var _db = _getCurrentDatabase();
			_db.transaction(function(trans) {
				trans.executeSql("select * from device_fault_list where data_id=? order by add_time desc", [dataId], function(ts, datas) {			
					if(datas.rows && datas.rows.length){
						for(var i=0;i<datas.rows.length;i++){
							faultDevices.push(
							{
								add_time:datas.rows.item(i)["add_time"],
								data_id:datas.rows.item(i)["data_id"],
								device_id:datas.rows.item(i)["device_id"],
								device_name:datas.rows.item(i)["device_name"],
								quantity:data.datas.item(i)["quantity"]
							});
						}
					}
					if(backcall) {
						backcall.call(this,faultDevices);
					}
				}, function(ts, message) {
					alert("获取故障设备时出错！");
				});
			});
		};
		//获取附件列表
		this.getAttachments =function(dataId,backcall) {
			var attachments=[];
			var _db = _getCurrentDatabase();
			_db.transaction(function(trans) {
				trans.executeSql("select * from attachments where data_id=? order by add_time desc", [dataId], function(ts, datas) {	
					if(datas.rows && datas.rows.length){
						for(var i=0;i<datas.rows.length;i++){
							attachments.push(
							{
								att_id:data.rows.item(i)["att_id"],
								add_time:data.rows.item(i)["add_time"],
								data_id:data.rows.item(i)["data_id"],
								file_name:data.rows.item(i)["file_name"],
								file_src:data.rows.item(i)["file_src"],
								file_type:data.rows.item(i)["file_type"],
								size:data.rows.item(i)["size"]
							});
						}
					}
					if(backcall){
						backcall.call(this,attachments);
					}
				}, function(ts, message) {
					alert("获取附件列表失败！");
				});
			});
		};
		//保存本地附件
		this.saveLocalAttachments=function(trans,dataId,attachments){
			//全部删除再插入
			trans.executeSql('delete from attachments where data_id=?',[dataId],function(trans, result) {},function(trans, error) {console.log(error.message);});
			for(var i=0;i<attachments.lengthl;i++){
				trans.executeSql('insert into attachments(att_id,add_time,data_id,file_name,file_src,file_type,size) values(?,?,?,?,?,?,?)',
					[attachments[i].att_id,attachments[i].add_time,dataId,attachments[i].file_name,attachments[i].file_src,attachments[i].file_type,0],function(trans, result) {},function(trans, error) {console.log(error.message);});
			}
		};
		//保存本地设备故障清单
		this.saveLocalFaultDevices=function(trans,dataId,faultDevices){
			trans.executeSql('delete from device_fault_list where data_id=?',[dataId],function(trans, result) {},function(trans, error) {console.log(error.message);});
			for(var i=0;i<faultDevices.lengthl;i++){
				trans.executeSql('insert into device_fault_list(add_time,data_id,device_id,device_name,quantity) values(?,?,?,?,?)',
					[faultDevices[i].add_time,dataId,faultDevices[i].device_id,faultDevices[i].device_name,faultDevices[i].quantity],function(trans, result) {},function(trans, error) {console.log(error.message);});
			}
		}
		//保存事故单到本地
		this.saveFault=function(faultEntity,faultDevices,attachments){
			console.log(JSON.stringify(faultEntity));
			console.log(JSON.stringify(faultDevices));
			console.log(JSON.stringify(attachments));
			var self=this;
			var dataId=faultEntity.id;
			_faultText="";
			if(dataId== ''){//新增
				dataId=_getNewId();
				_faultText='insert into device_fault(id,add_time,user_id,user_name,'
					+'dep_id,dep_name,company_id,company_name,'
					+'section_id,section_name,position_id,position_name,fault_type,occur_time,fault_description,is_up_service,up_time,'
					+'sid,sys_id,to_dept,up_user_name,up_user_tel,up_company_id,up_company_name)'
					+'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';		
			}else{
				_faultText='update device_fault set add_time=?,user_id=?,user_name=?,'
					+'dep_id=?,dep_name=?,company_id=?,company_name=?,'
					+'section_id=?,section_name=?,position_id=?,position_name=?,fault_type=?,occur_time=?,fault_description=?,is_up_service=?,up_time=?,'
					+'sid=?,sys_id=?,to_dept=?,up_user_name=?,up_user_tel=?,up_company_id=?,up_company_name=? where id=?';			
			}
			var _db = _getCurrentDatabase();
			_db.transaction(
				function(trans) {	
					console.log(_faultText);
					if(_faultEntity.id == ''){//新增
						trans.executeSql(_faultText,[dataId,faultEntity.add_time,faultEntity.user_id,faultEntity.user_name,
						faultEntity.dep_id,faultEntity.dep_name,faultEntity.company_id,faultEntity.company_name,
						faultEntity.section_id,faultEntity.section_name,faultEntity.position_id,faultEntity.position_name,faultEntity.fault_type,faultEntity.occur_time,faultEntity.fault_description,0,'',
						'',faultEntity.sys_id,faultEntity.to_dept,faultEntity.up_user_name,faultEntity.up_user_tel,faultEntity.up_company_id,faultEntity.up_company_name], 
						function(trans, result) {console.log(result.insertId);}, function(trans, error) {console.log(error.message);});
					}else{
						trans.executeSql(_faultText,[faultEntity.add_time,faultEntity.user_id,faultEntity.user_name,
						faultEntity.dep_id,faultEntity.dep_name,faultEntity.company_id,faultEntity.company_name,
						faultEntity.section_id,faultEntity.section_name,faultEntity.position_id,faultEntity.position_name,faultEntity.fault_type,faultEntity.occur_time,faultEntity.fault_description,0,'',
						'',faultEntity.sys_id,faultEntity.to_dept,faultEntity.up_user_name,faultEntity.up_user_tel,faultEntity.up_company_id,faultEntity.up_company_name,dataId],
						function(trans, result) {console.log(result.insertId);}, function(trans, error) {console.log(error.message);});
					}
					self.saveLocalFaultDevices(trans,dataId,faultDevices);
					self.saveLocalAttachments(trans,dataId,attachments);
				},function(){alert("保存失败！");},function(){alert("保存成功！");});
		};
		//获得一个数据字典
		this.getDictionarys=function(category_id,backcall){
			var _db = _getCurrentDatabase();
			_db.transaction(function(trans) {
				trans.executeSql("select code,name from dict_detail where category_id=? order by sort_code", [category_id], function(ts, datas) {			
					if(datas) {
						backcall.call(this,datas);
					}
				}, function(ts, message) {
					alert("获取数据字典时出错！");
				});
			});
		};
	}
	return db;
})();
