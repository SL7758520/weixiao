var Shop = (function() {
	var _db = new LocalDatabase();
	var API_SHOP = globals.apiUrl + 'Shop/';
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
		//若登录后的member.ShopId为空->获取当前城市店铺列表
		this.GetShopsByCityId = function(pageIndex,pageSize,cityId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetShopsByCityId", "pageIndex=" + pageIndex + "&pageSize=" +pageSize + "&cityId=" +cityId,
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
		//若登录后的member.ShopId不为空->获取当前ShopId的所有下级Shop
		this.GetShopsByShopId = function(pageIndex,pageSize, shopId,cityId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetShopsByShopId", "pageIndex=" + pageIndex + "&pageSize=" +pageSize+"&shopId=" + shopId + "&cityId=" +cityId,
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

	}
	return access;
})();