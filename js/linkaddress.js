var LinkAddress = (function() {
	var _db = new LocalDatabase();
	var API_LinkAddress = globals.apiUrl + 'MemberAddress/';

	function _getNetwork() {
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return false;
		} else {
			return true;
		}
	}

	var access = function() {
		this.GetList = function(callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_LinkAddress+"GetList", '' ,
				function(result) {
					if(callback) {
						callback.call(this, result);
					}
				},
				function(result) {
					if (onerror) {
						onerror.call(this,result);
					}
					
				});
		}
		
		this.Create = function(model,callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_LinkAddress+"Create", model ,
				function(result) {
					if(callback) {
						callback.call(this, result);
					}
				},
				function(result) {
					if (onerror) {
						onerror.call(this,result);
					}
					
				});
		}
		
		this.Delete = function(id,callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_LinkAddress+"Delete/"+id, '' ,
				function(result) {
					if(callback) {
						callback.call(this, result);
					}
				},
				function(result) {
					if (onerror) {
						onerror.call(this,result);
					}
					
				});
		}
		
		this.Edit = function(id,model,callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_LinkAddress+"Edit/"+id, model ,
				function(result) {
					if(callback) {
						callback.call(this, result);
					}
				},
				function(result) {
					if (onerror) {
						onerror.call(this,result);
					}
					
				});
		}
	}
	return access;
})();