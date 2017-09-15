var Member = (function() {
	var _db = new LocalDatabase();
	var API_MEMBER = globals.apiUrl + 'Member/';

	function _getNetwork() {
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return false;
		} else {
			return true;
		}
	}

	var access = function() {
		//修改个人信息
		this.UpdateField =  function(field,fieldValue,callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			AsyncPost(API_MEMBER+"UpdateField", "field="+field+"&fieldValue=" + fieldValue ,
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
		this.GetMemberInfo = function(callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			AsyncPost(API_MEMBER+"GetMemberInfo", '' ,
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