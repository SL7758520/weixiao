function getCheckboxValues(li){
	var selecteds = _getSelectedItems(li,'checkbox');
	return _getSelectedValues(selecteds);
}
function getCheckboxTexts(li){
	var selecteds = _getSelectedItems(li,'checkbox');
	return _getSelectedTexts(selecteds);
}
function getCheckboxItems(li){
	return _getSelectedItems(li,'checkbox');
}
function getRadioItem(li){
	var selecteds =  _getSelectedItems(li,'radio');
	return selecteds[0];
}	
function getRadioValue(li){
	var selecteds =  _getSelectedItems(li,'radio');
	return _getSelectedValues(selecteds)[0];
}
function getRadioText(li){
	var selecteds =  _getSelectedItems(li,'radio');
	return _getSelectedTexts(selecteds)[0];
}

function _getSelectedItems(li,type){
	var querys = [].slice.call(document.getElementById(li).querySelectorAll('input[type="'+type+'"]'));
	var values = [];
	querys.forEach(function(box) {
		if (box.checked) {
			values.push({ value:box.parentNode.getAttribute("data-value"), text:box.parentNode.innerText});			
		}
	});
	return values;
}
function _getSelectedTexts(selecteds){
	var values = [];
	selecteds.forEach(function(item) {
		values.push(item.text);
	});
	return values;
}
function _getSelectedValues(selecteds){
	var values = [];
	selecteds.forEach(function(item) {
		values.push(item.value);
	});
	return values;
}

function getValue(id){
	return document.getElementById(id).value;
}
function setValue(id,value){
	document.getElementById(id).value=value;
}

function getNewDataId(){
	var r = Math.random()*(999999-100000) + 100000;//12位随机数
	r = parseInt(r, 10);
	var time=new Date();
	var str="";
	str+=time.getFullYear();//年
	str+=time.getMonth()+1;//月 月比实际月份要少1
	str+=time.getDate();//日
	str+=time.getHours();//HH
	str+=time.getMinutes();//MM
	str+=time.getSeconds(); //SS
	return str + r; 
}

// 获取url中的参数
function getUrlParam (name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!= null) {
        return unescape(r[2]);
     }else{
        return '';
     }
}

//得到数组1不在数组2中的元素
function getArrayNotIn(array1,array2){
	var arr=[];
	for(var i=0;i<array1.length;i++){
		var flag=true;
		for(var j=0;j<array2.length;j++){
			if(array1[i]==array2[j]){
				flag=false;
				break;
			}
		}
		if(flag){
			arr.push(array1[i]);
		}
	}
	return arr;
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}  