
/**
 * val값 가져오기
 * @param strUrl
 * @param strKey
 * @returns
 */
function getValue(strUrl, strKey){
	//http://localhost:9090/JQueryPro/html/jquery09/jquery09_submit_result.html?userName=&userAge=&userId=&userPassword=&userHp=&userAddr=
	var userInfos = strUrl.substr(url.indexOf("?") + 1);
	var userInfo = userInfos.split("&");

	for(var i = 0; i < userInfo.length; i++){
		var val = userInfo[i].split("=");
		val[1] = val[1].replaceAll("+", " ");
		if(val[0] == strKey){
			if(val[1].length > 1){
				return val[1];
			}
			else {
				return "";
			}
		}
	}
}

/**
 * 빈값 유뮤 체크
 * @param val
 * @returns 빈값이면 true 빈값이 아니면 false
 */
function isEmpty(val){
	// val이 빈값이거나 null이거나 undefined이거나 " " 일때
	if(val == null || val == undefined || val == "undefined" || val == "null"){
		return true;
	} 
	val = jQuery.trim(val);
	if(val.length == 0) {
		return true;
	}
	return false;
}

/**
 * 핸드폰 번호 포맷
 * @param val
 * @param type
 * @returns
 */
function formatHp(val, type){
	val = val.replaceAll("-", "").replaceAll(" ", "");
	
	//010-1234-1234
	val = val.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
	
	return val;
}

/**
 * 생일 포맷
 * @param val
 * @param type
 * @returns
 */
function formatBir(val, type){
	val = val.replaceAll("-", "").replaceAll(" ", "");
	
	//2020년04년08일	
	val = val.replace(/(\d{4})(\d{1,2})(\d{1,2})/, "$1년$2월$3일");
	
	return val;
}

// 정규식 검사
function chkRegExp(val, type){
	var min, max;
	var regExp;
	var result;
	if(type == "userId"){
		min = 5; max = 10;
		regExp = /^[a-z][a-z0-9_]{5,10}$/;
		result = "빈 칸 없이 5~10 글자. 영문 소문자로 시작. 영문 소문자, 숫자 사용 가능.";
	} else if(type == "userPw"){
		min = 8; max = 20;
		regExp = /[a-z]+/ && /[A-Z]+/ && /[0-9]+/ && /[~`!@\#$%^&*\(\)_\-\=+\\|\[\{\]\};:\'\",<.>\/?]+/;
		result = "빈 칸 없이 8~20 글자. 영문 소문자, 대문자, 숫자, 특수문자가 반드시 1글자씩 포함.";
	} else if(type == "userName"){
		min = 2; max = 5;
		regExp = /^[가-힣]{2,5}$/;
		result = "빈 칸 없이 한글 2~5 글자.";
	}  else if(type == "userHp"){
		min = "null"; max = "null";
		regExp =/^(\d{3}-\d{3,4}-\d{4})|(\d{3}\d{3,4}\d{4})$/;
		result = "";
	} 
	if(!val.match(regExp)) {
		return false;
	}
	return true;
}
