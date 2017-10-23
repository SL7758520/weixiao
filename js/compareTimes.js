//获取时间毫秒值
 function dateStrToMillis(dateStr) {
	if(dateStr) {
		var dateStr1 = dateStr.replace(new RegExp("-", "gm"), "/");
		return(new Date(dateStr1)).getTime();
	}
	return null;
}