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
		this.GetShopOrders = function(pageIndex,pageSize,orderStatus,callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				if (onerror) {
						onerror.call(this);
					}
				return;
			}
			AsyncPost(API_MEMBER+"GetShopOrders", 'pageIndex='+pageIndex+'&pageSize='+pageSize+'&orderStatus='+orderStatus ,
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
		
		this.GetOrderDetails = function(orderId,callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			AsyncPost(API_MEMBER+"GetOrderDetails", 'orderId='+orderId,
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
		this.GetMemberDetail = function(callback,onerror){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			AsyncPost(API_MEMBER+"GetMemberDetail", '',
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
		//获取收藏店铺列表
		this.GetShopCollect = function( pageIndex,pageSize,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"GetShopCollect","pageIndex=" + pageIndex+"&pageSize="+pageSize ,
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
		//收藏店铺
		this.SetShopCollect = function( shopId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"SetShopCollect","shopId=" + shopId ,
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
		//取消收藏店铺
		this.RemoveShopCollect = function( shopId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"RemoveShopCollect","shopId=" + shopId ,
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
		//获取收藏床位列表
		this.GetShopProductCollect = function(pageIndex,pageSize,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"GetShopProductCollect","pageIndex=" + pageIndex+"&pageSize="+pageSize ,
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
		//收藏床位
		this.SetShopProductCollect = function(productId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"SetShopProductCollect","productId=" + productId,
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
		//取消收藏床位
		this.RemoveShopProductCollect = function(productId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"RemoveShopProductCollect","productId=" + productId,
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
		
		//GET /api/Member/GetShopOrderItemsForInvoice
		this.GetShopOrderItemsForInvoice = function(pageIndex,pageSize,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"GetShopOrderItemsForInvoice","pageIndex=" + pageIndex+"&pageSize="+pageSize,
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
		///api/Member/OrderInvoiceApply提交发票申请
		this.OrderInvoiceApply = function(memberAddressId,invoiceType,invoiceTitle,taxNumber,bankName,bankAccount,address,phone,remark,money,orderIdArray,onSuccess,onError){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}

			PostRequest(API_MEMBER+'OrderInvoiceApply?memberAddressId='+memberAddressId+'&invoiceType='+invoiceType+'&invoiceTitle='+invoiceTitle+'&taxNumber='+taxNumber+'&bankName='+bankName+'&bankAccount='+bankAccount+'&address='+address+'&phone='+phone+"&remark="+remark+"&money="+money,orderIdArray,function(result){
				if (onSuccess) {
					console.log('接口返回数据：' + JSON.stringify(result));
					onSuccess.call(this,result);
				}
			},function(){
				mui.toast("网络不太好哦~请稍后再试!");
			});
		}
		
		//api/Member/GetOrderInviceList已经申请的发票信息列表
		this.GetOrderInviceList = function(pageIndex,pageSize,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"GetOrderInviceList","pageIndex=" + pageIndex+"&pageSize="+pageSize,
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
		
		///api/Member/GetOrderInvoiceDetail获取发票详情
		this.GetOrderInvoiceDetail = function(invoiceId,callback) {
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			var user = _db.getUser();
			AsyncPost(API_MEMBER+"GetOrderInvoiceDetail","invoiceId=" + invoiceId,
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
		//修改密码
		this.ChangPassword = function(oldPassword,newPassword,callback){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_MEMBER+'ChangPassword?oldPassword='+oldPassword+'&newPassword='+newPassword,'',function(result){
				if (callback) {
					console.log('接口返回数据：' + JSON.stringify(result));
					callback.call(this,result);
				}
			},function(){
				mui.toast("网络不太好哦~请稍后再试!");
			});
		}
		//忘记密码
		this.ResetPassword = function(newPassword,callback){
			if(!_getNetwork()) {
				mui.toast("没有网络连接，请稍后再试！");
				return;
			}
			PostRequest(API_MEMBER+'ResetPassword?&newPassword='+newPassword,'',function(result){
				if (callback) {
					console.log('接口返回数据：' + JSON.stringify(result));
					callback.call(this,result);
				}
			},function(){
				mui.toast("网络不太好哦~请稍后再试!");
			});
		}

	}
	return access;
})();