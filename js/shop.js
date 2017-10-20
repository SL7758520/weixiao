var Shop = (function() {
	var _db = new LocalDatabase();
	var API_SHOP = globals.apiUrl + 'Shop/';
	var API_PHOTO = globals.apiUrl + 'AppHome/';
	var API_MEMBER = globals.apiUrl + 'Member/';
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
		
		//获取热门床位
		this.GetHotProducts = function(cityId, categoryId,topSize,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetHotProducts","cityId=" + cityId+"&categoryId="+categoryId+"&topSize="+topSize ,
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
		
		//获取店铺详细信息
		this.GetShopModel = function( shopId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetShopModel","shopId=" + shopId ,
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
		
		//按名称搜索店铺
		this.ShopSearch = function( pageIndex,pageSize,name,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			PostRequest(API_SHOP+"ShopSearch?pageIndex=" + pageIndex + "&pageSize=" +pageSize+"&name=" + name,"",
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
		
		//按条件搜索产品
		this.ProductSearch = function(pageIndex,pageSize, categoryId,cityId,jsonAttributes,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"ProductSearch", "pageIndex=" + pageIndex + "&pageSize=" +pageSize+"&categoryId=" + categoryId + "&cityId=" +cityId+"&jsonAttributes="+jsonAttributes,
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
		
		//获取Shop下的所有床位列表
		this.GetProducts = function(pageIndex,pageSize, shopId,categoryId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetProducts", "pageIndex=" + pageIndex + "&pageSize=" +pageSize+"&shopId=" + shopId + "&categoryId=" +categoryId,
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
	
		//获取Shop下的所有床位详细信息
		this.GetProductModel = function( productId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetProductModel","productId=" + id ,
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
		
		
		
		//获取筛选类型
		this.GetAttributes = function(callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetAttributes", "",
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
		
		//获取店铺图片类型
		this.GetShopPhotoTypes = function(callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetShopPhotoTypes", "",
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
		//获取店铺图片列表
		this.GetShopPhotos = function( shopId,photoTypeId,isAd,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_SHOP+"GetShopPhotos", "&shopId=" + shopId + "&photoTypeId=" +photoTypeId+"&isAd="+isAd,
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
			AsyncPost(API_PHOTO + "GetImageSiteServerUrl",'serverName=Shop',
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
		
		//POST /api/Shop/MakeServiceOrder创建服务订单
		this.MakeServiceOrder = function(productId,categoryId,quantity,address,phone,remark,bookedDate,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_SHOP+'MakeServiceOrder?productId='+productId+'&categoryId='+categoryId+'&quantity='+quantity+'&address='+address+'&phone='+phone+'&remark='+remark+'&bookedDate='+bookedDate,'',function(result){
				if (onSuccess) {
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast('没有网络连接，请稍后再试！');
			});
		}
		
		this.MakeOrder = function(productId,quantity,peopleAmount,address,phone,remark,bookedDate,categoryId,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var LinkManID = [];
			for(var i = 0; i < linkMains.length; i++) {
				LinkManID.push(linkMains[i].Id+"");
			}
			PostRequest(API_SHOP+'MakeOrder?productId='+productId+'&quantity='+quantity+'&peopleAmount='+peopleAmount+'&address='+address+'&phone='+phone+'&remark='+remark+'&bookedDate='+bookedDate+'&categoryId='+categoryId,'LinkManID',function(result){
				if (onSuccess) {
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast('没有网络连接，请稍后再试！');
			});
		}
		this.OrderCancel = function(orderId,reason,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_SHOP+'OrderCancel?orderId='+orderId+'&reason='+reason,'',function(result){
				if (onSuccess) {
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast('没有网络连接，请稍后再试！');
			});
		}
		//订单评价
		this.OrderComment = function(orderId,shopId,itemsId,memberId,content,mark,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_SHOP+'OrderComment?orderId='+orderId+'&shopId='+shopId+'&itemsId='+itemsId+'&memberId='+memberId+'&content='+content+'&mark='+mark,'',function(result){
				if (onSuccess) {
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast('没有网络连接，请稍后再试！');
			});
		}
		//申请退款
		this.OrderApplyRefund = function(orderId,reson,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_SHOP+'OrderApplyRefund?orderId='+orderId+'&reson='+reson,'',function(result){
				if (onSuccess) {
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast('没有网络连接，请稍后再试！');
			});
		}
		//完成入住
		this.OrderFinish = function(orderId,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_SHOP+'OrderFinish?orderId='+orderId,'',function(result){
				if (onSuccess) {
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast('没有网络连接，请稍后再试！');
			});
		}

	}
	return access;
})();