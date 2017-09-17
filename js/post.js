//var globals={apiUrl:'http://128.23.60.253:3221/WebService/App/'};//app接口地址//OMP.Web 
//var globals={apiUrl:'http://128.23.60.253/OMP.Web/WebService/App/',domain:'http://hop.gdxinyue.net'};//app接口地址//OMP.Web 
var globals={apiUrl:'http://www.jeffsoft.cn:9801/Api/',domain:'http://oa.gdxinyue.net:1002'};//app接口地址//OMP.Web
//var globals={apiUrl:'http://128.23.51.5:1002/WebService/App/',domain:'http://128.23.51.5:1002'};//app接口地址//OMP.Web
//var globals={apiUrl:'http://hop.gdxinyue.net/WebService/App/',domain:'http://hop.gdxinyue.net'};//app接口地址//OMP.Web
function postData(apiUrl,isAsync, dataStr, onSuccess,waitingMsg) {
	var waitingDialog = plus.nativeUI.showWaiting(waitingMsg||''); 
    mui.ajax(apiUrl,{  
        data:dataStr, 
        dataType:'json',  
        type:'get',
        async:isAsync,
        timeout:10000, 
        success:function(data){
        	waitingDialog.close();  
        	onSuccess.call(this,data);
        },
        error:function(xhr,type,errorThrown){ 
            waitingDialog.close(); 
            mui.toast("网络连接失败，请稍后重试!");  
        }   
    });  
}  

function AsyncPost(apiUrl,dataStr, onSuccess,onError) {
//	console.log(apiUrl+'?'+dataStr);
    _postData(apiUrl,true, dataStr, onSuccess,onError);
}  
function AsyncPosts(apiUrl,dataStr, onSuccess,onError) {
    _postDatas(apiUrl,true, dataStr, onSuccess,onError);
} 
function SyncPost(apiUrl,dataStr, onSuccess,onError) {
    _postData(apiUrl,false, dataStr, onSuccess,onError);
}  
function PostRequest(apiUrl,dataStr, onSuccess,onError){
	postrequest(apiUrl,true, dataStr, onSuccess,onError);
}

function _postData(apiUrl,isAsync, dataStr, onSuccess,onError){
	console.log('url路径是：'+apiUrl+'?'+dataStr);
	var _db = new LocalDatabase();
//	console.log(_db.getUser().Token);
	mui.ajax(apiUrl,{  
		headers:{'Authorization':_db.getUser().Token},
        data:dataStr, 
        //text
        dataType:'json',  
        type:'GET',
        async:isAsync,
        timeout:10000, 
       
        success:function(data){
        	onSuccess.call(this,data);
        },
        error:function(xhr,type,errorThrown){  
            console.log('++++++++++'+errorThrown+'++++'+xhr+"++++++++++"+type);
            console.log(xhr.responseText);
        	onError.call(this);
        }   
    });  
}
function _postDatas(apiUrl,isAsync, dataStr, onSuccess,onError){
	console.log('url路径是：'+apiUrl+'?'+dataStr);
	mui.ajax(apiUrl,{  
        data:dataStr, 
        //text
        dataType:'json',  
        type:'GET',
        async:isAsync,
        timeout:10000,  
        success:function(data){
        	onSuccess.call(this,data);
        },
        error:function(xhr,type,errorThrown){  
            console.log('++++++++++'+errorThrown+'++++'+xhr+"++++++++++"+type);
            console.log(xhr.responseText);
        	onError.call(this);
        }   
    });  
}

function postrequest(apiUrl,isAsync, dataStr, onSuccess,onError){
	console.log('url路径是：'+apiUrl+'?'+dataStr);
	var _db = new LocalDatabase();
//	console.log(_db.getUser().Token);
	mui.ajax(apiUrl,{
		headers:{'Authorization':_db.getUser().Token},
        data:dataStr, 
        //text
        dataType:'json',  
        type:'post',
        async:isAsync,
        timeout:10000,  
        success:function(data){
        	onSuccess.call(this,data);
        },
        error:function(xhr,type,errorThrown){  
        	plus.nativeUI.closeWaiting();
            console.log('++++++++++'+errorThrown+'++++'+xhr+"++++++++++"+type);
            console.log(xhr.responseText);
        	onError.call(this);
        }   
    }); 
}

