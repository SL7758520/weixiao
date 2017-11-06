var Account = (function() {
	var _db = new LocalDatabase();
	var API_LOGIN = globals.apiUrl + 'Account/';
	var API_URL_ACTION = globals.apiUrl + 'Action.ashx';
	var API_URL_ACTION_ = globals.apiUrl + 'Action_.ashx';
	var API_URL = globals.apiUrl + "Service.ashx";
	var API_URL_TIME_MAINMENT = globals.apiUrl + 'InspectUsual.ashx'
	var API_URL_EXCUTE_UINT = globals.apiUrl + 'InspectUsual.ashx';
	var API_URL_ONLINE_PENSON = globals.apiUrl + 'Users.ashx';
	var API_URL_DESKTOP_REPORT = globals.apiUrl + 'DesktopReport.ashx';
	var API_URL_MAP = globals.apiUrl + 'Map.ashx';

	function _getNetwork() {
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return false;
		} else {
			return true;
		}
	}

	var access = function() {
		//注册第二步
		this.RegisterByMobile_GetSmsCode = function(mobile,imgCode, callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_LOGIN+"RegisterByMobile_GetSmsCode", "mobile=" + mobile + "&imgCode=" +imgCode,
				function(result) {
					if(callback) {
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};
		//注册第三步，验证短信验证码RegisterByMobile_VerifySmsCode
		this.RegisterByMobile_VerifySmsCode = function(shopId,mobile,password,smsCode, callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_LOGIN+"RegisterByMobile_VerifySmsCode", "shopId="+shopId+"&mobile=" + mobile + "&password=" +password + "&smsCode=" +smsCode,
				function(result) {
					if(callback) {
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};

		//账号密码登录
		this.Login = function(loginInfo, callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_LOGIN+"Login", "mobile=" + loginInfo.mobile + "&password=" + loginInfo.password,
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};
		
		//快速登录获取图片验证码
		this.LoginBySmsImgCode = function(mobile, callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPosts(API_LOGIN+"LoginBySmsImgCode", "mobile=" + mobile,
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};
		
		//快速登录图片验证码认证
		this.LoginBySms_GetCode = function(mobile,imgCode, callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPosts(API_LOGIN+"LoginBySms_GetCode", "mobile=" + mobile+"&imgCode="+imgCode,
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};
		
		//快速登录短信验证码认证
		this.LoginBySms_Verify = function(mobile,smsCode, callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPosts(API_LOGIN+"LoginBySms_Verify", "mobile=" + mobile+"&smsCode="+smsCode,
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};
		//第三方认证登录
		this.Auth = function(authType, openId,token,nickName,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPosts(API_LOGIN+"Auth", "authType=" + authType+"&openId=" + openId+"&token=" + token+"&nickName=" + nickName,
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					mui.toast("网络不太好哦~请稍后再试!");
				});
		};

	}
	return access;
})();