/**
 * 
 */
function fnGet(){
	// submit 실행
	var fm = document.getElementById("fm"); // <form>
	fm.action = "html1.html?userId=test&password=asdf"; // url 세팅
	fm.method = "post";
	fm.submit();
}
		
function fnAjax(){
	$.ajax({
		url : "intro.html"
		, type : "GET"
		, success : function(data){
			$("#divResult").html(data);
		}
		, error : function(){
			
		}
	})
}
		
function fnText(){
	$.ajax({
// 		url : "../sample/data_text.txt"
		url : "/JQueryPro/html/sample/data_text.txt"
// 		, type : "get"
//		, data : {}
		, dataType : "text"
		, success : function(data){
			$("#divResult").text(data);
		}
	});
}

function fnHtml(){
	$.ajax({
//		url : "../sample/data_text.txt"
	url : "/JQueryPro/html/sample/data_text.txt"
//		, type : "get"
//		, data : {}
		, dataType : "text"
		, success : function(data){
			$("#divResult").html(data);
		}
	});
}

function fnJsonObj(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_json_obj.txt"
		, dataType : "json"
		, success : function(data){
			$("#divResult").html(
					"이름 : " + data.name
				+ "<br>나이 : " + data.age
				+ "<br>성별 : " + data.gender
				+ "<br>직업 : " + data.job
			);
		}
	});
}
		
function fnJsonArr(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_json_arr.txt"
		, dataType : "json"
		, success : function(data){
			var str = "";
			for(var i in data){
				str += "<li>" + data[i] + "</li>";
			}
// 					$.each(data, function(idx){
// 						str += "<li>" + data[idx] + "</li>";
// 					})
			$("#divResult").html(
				"<ol>" + str + "</ol>"
			);
		}
		, error : function(xhr){
			
		}
	});
}
		
function fnJsonList(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_json_list.txt"
		, dataType : "json"
		, success : function(data){
			var str = "";
// 			for(var obj in data){
// 				str += (parseInt(obj) + 1) + "번째 회원<br>"
// 					+ "--------------------<br>"
// 					+ "이름 : " + data[obj].name
// 					+ "<br>나이 : " + data[obj].age
// 					+ "<br>성별 : " + data[obj].gender
// 					+ "<br>직업 : " + data[obj].job
// 					+ "<br>=============<br>"
// 			}
			str += "<br><table><tr><th>회원번호</th>" 
				+ "<th>이름</th>"
				+ "<th>나이</th>"
				+ "<th>성별</th>"
				+ "<th>직업</th></tr>";
			for(var obj in data){
				str += "<tr><td>" + (parseInt(obj) + 1) + "</td>"
					+ "<td>" + data[obj].name + "</td>"
					+ "<td>" + data[obj].age + "</td>"
					+ "<td>" + data[obj].gender + "</td>"
					+ "<td>" + data[obj].job + "</td></tr>";
			}
			str += "</table>";
			$("#divResult").html(str);
		}
	});
	
}
function fnXmlTitle(){
	$.ajax({
		url : "cd_catalog.xml"
// 		, type : "get" // or "post"
// 		, data : {}
		, dataType : "xml"
		, success : function(data){
			makeTitleList(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("오류발생!");
		}
	});
}
function makeTitleList(param){
	var titles = param.getElementsByTagName("TITLE");
// 	console.log(titles[0].childNodes);
// 	console.log(titles[0].childNodes[0]);
// 	console.log(titles[0].childNodes[0].nodeValue);
	//[HTML 교재 10 - DOM순회] pdf 참고..
	var title = "제목 목록<hr>"
	for (var i = 0; i < titles.length; i++) {
		title += titles[i].childNodes[0].nodeValue + "<br>"
	}
	$("#divResult").html(title);
}
		
function fnXmlArtist(){
	$.ajax({
		url : "cd_catalog.xml"
// 		, type : "get" // or "post"
// 		, data : {}
		, dataType : "xml"
		, success : function(data){
			console.log(data.getElementsByTagName("CD"));
			makeArtistList(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("오류발생!");
		}
	});
}
function makeArtistList(param){
	var artists = param.getElementsByTagName("ARTIST");
	var artist = "아티스트 목록<hr>";
	for (var i = 0; i < artists.length; i++) {
		artist += artists[i].innerHTML + "<br>"
// 		artist += $(artists[i]).text() + "<br>"
	}
	$("#divResult").html(artist);
}
		
function fnXmlTable(){
	$.ajax({
		url : "cd_catalog.xml"
		, dataType : "xml"
		, success : function(data){
			makeTable(data);
		}
		, error : function(xhr){
			console.log(xhr);
		}
	});
}
function makeTable(param) {
	var cds = param.getElementsByTagName("CD");
	
	var result = "<br><table><tr><th>번호</th>"
		+ "<th>제목</th>"
		+ "<th>아티스트</th>"
		+ "<th>국가</th>"
		+ "<th>회사</th>"
		+ "<th>가격</th>"
		+ "<th>년도</th></tr>";
	
	for(var i = 0; i < cds.length; i++) {
		var obj = $(cds[i]).children();
		result += "<tr><td>" + (i+1) + "</td>";
		for(var j = 0; j < obj.length; j++){
			result += "<td>" + $(obj[j]).text() + "</td>";
		}
		result += "</tr>";
	}
	result += "</table>";
	
	$("#divResult").html(result);
}