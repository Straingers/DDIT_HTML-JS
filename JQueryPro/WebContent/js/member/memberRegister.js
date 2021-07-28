/**
 * 
 */
$(document).ready(function(){
	
	// 직업코드 조회해서 세팅하기
	initJobSelect();
	
	// 기념일코드 조회해서 세팅하기
	initMemorialSelect();
	
	// 취미코드 조회해서 세팅하기
	initHobbyCheckBox();
	
	// 광고 메일 수신 여부 기본값 세팅 - 미수신
	$("[name=revcEmailYnN]").prop("checked", true);
	
	// 우편번호찾기 세팅
	initCitySelect();
	
	$("#zip").on("dblclick", "tr", function(){
		$("#zipCode").val($(this).children("td:eq(0)").text());
		$("#add1").val($(this).children("td:eq(1)").text());
		$('#myModal').modal("hide");
	});
	
	// [중복검사] 버튼에 클릭 이벤트
	$("#btnMemId").click(function(){
		var memId = $("#id").val();
		
		// 빈 값 확인				
		if(isEmpty(memId)){
			alert("ID 값이 입력되지 않았습니다.");
			$("#id").focus();
			return;
		}
		
		// 유효성 검사 (myUtil.js에서 만든 chkRegExp()메서드 이용)
		if(!chkRegExp(memId, "userId")) {
			alert("ID 값이 유효하지 않습니다.");
			$("#spMemIdCkN").hide();
			$("#spMemIdCkY").hide();
			$("#spMemIdReq").show();
			$("#id").focus();
			return
		}
		
		// DB에서 중복검사 수행
		$.ajax({
			url : "/JQueryPro/MemberServlet"
			, type : "post"
			, data : {
				"memId" : memId
				, "flag" : "CHKID"	
			}
			, dataType : "json"
			, success : function(data){
				console.log(data);
				if(data.resultCnt == 1) {
					$("#spMemIdCkY").hide();
					$("#spMemIdReq").hide();
					$("#spMemIdCkN").show();
					$("#id").focus();
				} else if(data.resultCnt == 0) {
					$("#spMemIdReq").hide();
					$("#spMemIdCkN").hide();
					$("#spMemIdCkY").show();
				}						
			}
			, error : function(xhr){
				console.log(xhr);
				alert("ID 중복 검사중 오류가 발생하였습니다.")
			}
		})
	});
});

function openZip(){
	
	initCitySelect();
	
	$("#zip").empty();
	
	$("#myModal").modal();
}

function initJobSelect(){
	$.ajax({
		url : "/JQueryPro/CodeServlet"
		, type : "post"
		, data : {"groupCode" : "A02"} // 직업코드 조회
		, dataType : "json"
		, success : function(data) {
			console.log(data);
			makeJobSelect(data);
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}
// 직업 요소들을 select박스 안에 option으로 넣는다
function makeJobSelect(data){

	var strHtml = "<option selected='selected' value=''>=== 선택 ===</option>";
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<option value='" + data[i].value + "'>" 
					+ data[i].name + "</option>";
	}
	$("#job").html(strHtml);
}

function initMemorialSelect(){
	$.ajax({
		url : "/JQueryPro/CodeServlet"
		, type : "post"
		, data : {"groupCode" : "A03"} // 기념일코드 조회
		, dataType : "json"
		, success : function(data) {
			console.log(data);
			makeMemorialSelect(data);
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}
// 기념일 요소들을 select박스 안에 option으로 넣는다
function makeMemorialSelect(data){

	var strHtml = "<option selected='selected' value=''>=== 선택 ===</option>";
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<option value='" + data[i].value + "'>" 
					+ data[i].name + "</option>";
	}
	$("#any").html(strHtml);
}

function initHobbyCheckBox(){
	$.ajax({
		url : "/JQueryPro/CodeServlet"
		, type : "post"
		, data : {"groupCode" : "A01"} // 취미코드 조회
		, dataType : "json"
		, success : function(data) {
			console.log(data);
			makeHobbyCheckBox(data);
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}

// 취미 요소들을 checkbox로 만들어서 <div id="hobby">안에 넣는다
function makeHobbyCheckBox(data) {
	var strHtml = "";
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<label class='checkbox-inline'><input type='checkbox' value='"
					+ data[i].value + "'>" 
					+ data[i].name + "</label>";
	}
	$("#hobby").html(strHtml);
}

// 우편번호 찾기
function initCitySelect(){
	$.ajax({
		url : "/JQueryPro/ZipServlet"
		, type : "post"
		, dataType : "json"
		, success : function(data) {
			makeCitySelect(data);
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}
// 시/도
function makeCitySelect(data) {
	var strHtml = "<option selected='selected' value=''>선택하세요</option>";
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<option>" 
					+ data[i].sido + "</option>"
	}
	$("#sido").html(strHtml);
	
	// 방법2)
//	setGugun();
	
	// 방법3)
	// trigger로 change 이벤트 호출
	
	
	
}
// 군/구
function setGugun(){
	$.ajax({
		url : "/JQueryPro/ZipServlet"
		, type : "post"
		, data : {
			"sido" : $("#sido").val()
			, "flag" : "GU"		
		}
		, dataType : "json"
		, success : function(data) {
			console.log(data);
			makeGugunSelect(data);
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}
function makeGugunSelect(data){
	var strHtml = "<option selected='selected' value=''>선택하세요</option>";
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<option>" 
					+ data[i].gugun + "</option>"
	}
	$("#gugun").html(strHtml);
	$("#gugun").prop("disabled", false);
	
//	setDong();
}
function setDong(){
	$.ajax({
		url : "/JQueryPro/ZipServlet"
		, type : "post"
			, data : {
				"sido" : $("#sido").val()
				, "gugun" : $("#gugun").val()		
				, "flag" : "DONG"
			}
		, dataType : "json"
			, success : function(data) {
				console.log(data);
				makeDongSelect(data);
			}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}
function makeDongSelect(data){
	var strHtml = "<option selected='selected' value=''>선택하세요</option>"; 
			
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<option>" 
					+ data[i].dong + "</option>"
	}
	$("#dong").html(strHtml);
	$("#dong").prop("disabled", false);
	
}

function setZip(){
	$.ajax({
		url : "/JQueryPro/ZipServlet"
		, type : "post"
		, data : {
			"sido" : $("#sido").val()
			, "gugun" : $("#gugun").val()
			, "dong" : $("#dong").val()
			, "flag" : "ZIP"
		}
		, dataType : "json"
			, success : function(data) {
				console.log(data);
				makeZipList(data);
			}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	});
}
function makeZipList(data){
	var strHtml = "<table align='center'><tr><th>우편번호</th><th>번지</th></tr>";
	
	for(var i = 0; i < data.length; i++){
		if(data[i].bunji == "null"){
			data[i].bunji = "";
		}
		strHtml += "<tr><td>" + data[i].zipCode + "</td>"
				+ "<td>" + data[i].sido + " " 
				+ data[i].gugun + " " 
				+ data[i].dong + " "
				+ data[i].bunji + "</td><tr>"
	}
	strHtml += "</table>";
	$("#zip").html(strHtml);
	
}

// 회원정보 저장하기
function save(){
	// 회원정보 유효성 체크
	var result = validate();
	if(!result){
		return;
	}
	
	// 사용자 컨펌
	if(!confirm("저장하시겠습니까?")) {
		return;
	}
	
	// DB에 저장하는 ajax 호출
	$("#formFlag").val("C");
	
	$.ajax({
		url : "/JQueryPro/MemberServlet"
		, type : "post"
		, data : $("#fm").serialize()
		, dataType : "json"
		, success : function(data){
			alert("저장되었습니다.");
			
			// 페이지 이동
			changePage();
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("실패하였습니다.\n관리자에게 문의하세요.");
		}
	});
}

function changePage(){
	// 방법 1
//	window.location.href = "JQueryPro/html/member/memberlist2.html";
	
	// 방법 2
	var fm = document.getElementById("fm");
	fm.action = "/JQueryPro/html/member/memberlist.html"; // 서블릿을 호출하기도 함
	fm.method = "post";
	fm.submit();
}

function validate(){
	// ...
//	return false;
	
	// 체크가 끝나면
	return true;
}
