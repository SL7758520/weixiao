var AppHome = (function() {
	var _db = new LocalDatabase();
	var API_APPHOME = globals.apiUrl + 'AppHome/';
	var API_SHOP = globals.apiUrl + 'Shop/';


	function _getNetwork() {
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return false;
		} else {
			return true;
		}
	}

	var access = function() {
		//通过城市名获取城市ID
		this.GetCityIdByCityName = function(cityName,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_APPHOME+"GetCityIdByCityName","cityName=" + cityName ,
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
		
		//GET /api/Shop/GetProductCategories获取当前用户的产品类别
		this.GetProductCategories = function(parentId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetProductCategories","parentId=" + parentId ,
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
		
		//GET /api/Shop/GetProductsByCategoryID获取指定类别的产品
		this.GetProductsByCategoryId = function(shopId,categoryId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetProductsByCategoryId","shopId=" + shopId+"&categoryId="+categoryId ,
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