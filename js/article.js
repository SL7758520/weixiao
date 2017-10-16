var Article = (function() {
	var _db = new LocalDatabase();
	var API_ARTICLE = globals.apiUrl + 'Article/';


	function _getNetwork() {
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return false;
		} else {
			return true;
		}
	}

	var access = function() {
		//获取新闻列表
		this.GetTopList = function(shopId,topSize,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetTopList", "shopId=" + shopId + "&topSize=" +topSize,
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					console.log('请求失败：');
				});
		};
	
		//获取图片路径
		this.getPhotoUrl = function(callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_PHOTO + "GetImageSiteServerUrl",'serverName=Article',
				function(result) {
					if(callback) {
						console.log('接口返回数据：' + JSON.stringify(result));
						callback.call(this, result);
					}
				},
				function() {
					mui.toast('没有网络连接，请稍后再试！');
				});
		};
		
	}
	return access;
})();