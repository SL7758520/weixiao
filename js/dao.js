var DataAccess = (function() {
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
		this.updateDatabase = function() {
			_db.updateDatabase();
		};
		//当前用户
		this.getUser = function() {
			return _db.getUser();
		};
		this.setUser = function(user) {
			_db.setUser(user);
		};
		this.logOutUser = function() {
			_db.setUser({});
			//			_db.setSetting({});
		};
		this.getSetting = function() {
			return _db.getSetting();
		};
		this.setSetting = function(setting) {
			_db.setSetting(setting);
		};
		
		this.getShopCollect = function() {
			return _db.getShopCollect();
		};
		this.setShopCollect = function(datas) {
			_db.setShopCollect(datas);
		};
		this.getShopProductCollect = function() {
			return _db.getShopProductCollect();
		};
		this.setShopProductCollect = function(datas) {
			_db.setShopProductCollect(datas);
		};
		

	}
	return access;
})();