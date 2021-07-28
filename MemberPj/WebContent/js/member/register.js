/**
 * 
 */
var userId = "";

$(document).ready(function(){
	$("#zip").on("dblclick", "tr", function(){
		$("#zipCode").val($(this).children("td:eq(0)").text());
		$("#add1").val($(this).children("td:eq(1)").text());
		$("#myModal").modal("hide");
		$("#dong").val("");
		$("#zip").empty();
	});
	
	//[중복검사] 버튼에 클릭 이벤트
	$("#btnMemId").click(function(){
		var memId = $("#id").val();
		
		// 빈 값 확인				
		if(!isEmpty(memId)){
			alert("ID 값이 입력되지 않았습니다.");
			$("#id").focus();
			return;
		}
		
		// 유효성 검사 (myUtil.js에서 만든 chkRegExp()메서드 이용)
		if(!chkRegExp(memId, "id")) {
			alert("ID 값이 유효하지 않습니다.");
			$("#spMemIdCk").hide();
			$("#spMemIdUse").hide();
			$("#spMemIdReq").show();
			$("#id").focus();
			return;
		}
		
		// DB에서 중복검사 수행
		$.ajax({
			url : "/MemberPj/MemberServlet"
			, type : "post"
			, data : {
				"memId" : memId
				, "flag" : "CHKID"	
			}
			, dataType : "json"
			, success : function(data){
				console.log(data);
				if(data.resultCnt == 1) {
					$("#spMemIdReq").hide();
					$("#spMemIdCk").show();
					$("#id").focus();
				} else if(data.resultCnt == 0) {
					$("#spMemIdReq").hide();
					$("#spMemIdCk").hide();
					$("#spMemIdUse").text("\'" + $("#id").val() + "\' 사용 가능");
					$("#spMemIdUse").show();
					userId = memId;
				}						
			}
			, error : function(xhr){
				console.log(xhr);
				alert("ID 중복 검사중 오류가 발생하였습니다.")
			}
		})
	});
});

function initAddrTable(){
	$.ajax({
		url : "/MemberPj/ZipServlet"
		, type : "post"
		, data : {
			"dong" : $("#dong").val()
			, "flag" : "DONG"
		}
		, dataType : "json"
		, success : function(data){
			console.log(data);
			makeAddrTable(data);
		}
		, error : function(xhr) {
			console.log(xhr);
			alert("오류!");
		}
	})
}

function makeAddrTable(data){
	var strHtml = "<table align='center'><tr><th>우편번호</th><th>번지</th></tr>";
	
	for(var i = 0; i < data.length; i++){
		strHtml += "<tr><td>" + data[i].zip + "</td>"
				+ "<td>" + data[i].sido + " " 
				+ data[i].gugun + " " 
				+ data[i].dong + " "
				+ data[i].bunji + "</td><tr>";
	}
	strHtml += "</table>";
	$("#zip").html(strHtml);
}

function validate() {
	if(!isEmpty($("#name").val())){
		alert("이름이 입력되지 않았습니다.");
		$("#name").focus();
		return false;
	}
	if(!chkRegExp($("#name").val(), "name")){
		alert("이름 값이 유효하지 않습니다.");
		$("#spMemNameReq").show();
		$("#name").focus();
		return false;
	} 
	$("#spMemNameReq").hide();
	
	if(!isEmpty($("#birth").val())){
		alert("생년월일이 입력되지 않았습니다.");
		$("#birth").focus();
		return false;
	}
	var today = new Date().getFullYear();
	
	var regBirth = today - $("#birth").val().substr(0, 4) + 1;
	
	if(regBirth < 10) {
		alert("10살 이상만 가입이 가능합니다.");
		return false;
	}
	
	if(!isEmpty($("#password").val())){
		alert("비밀번호가 입력되지 않았습니다.");
		$("#password").focus();
		return false;
	}
	if(!chkRegExp($("#password").val(), "password")){
		alert("비밀번호 값이 유효하지 않습니다.");
		$("#spMemPassReq").show();
		$("#password").focus();
		return false;
	}
	$("#spMemPassReq").hide();
	
	if(!isEmpty($("#hp").val())){
		alert("전화번호가 입력되지 않았습니다.");
		$("#hp").focus();
		return false;
	}
	if(!chkRegExp(formatHp($("#hp").val()), "hp")){
		alert("전화번호 형식이 맞지 않습니다.");
		$("#hp").focus();
		return false;
	}
	if(!isEmpty($("#email").val())){
		alert("이메일이 입력되지 않았습니다.");
		$("#email").focus();
		return false;
	}
	if(!chkRegExp($("#email").val(), "email")){
		alert("이메일 형식이 맞지 않습니다.");
		return false;
	}
	if(!isEmpty($("#zipCode").val())){
		alert("주소가 입력되지 않았습니다.");
		return false;
	}
	if(!isEmpty($("#add2").val())){
		alert("주소가 입력되지 않았습니다.");
		$("#add2").focus();
		return false;
	}
	return true;
}

function save() {
	if($("#id").val() == ""){
		alert("ID 값이 입력되지 않았습니다.");
		$("#spMemIdReq").hide();
		$("#spMemIdCk").hide();
		$("#spMemIdUse").hide();
		return;
	}
	
	if(userId != $("#id").val()){
		alert("ID \'중복검사\'를 해주세요.");
		$("#spMemIdReq").hide();
		$("#spMemIdCk").hide();
		$("#spMemIdUse").hide();
		return;
	}
	
	var result = validate();

	if(!result) {
		return;
	}
	
	if(!confirm("저장하시겠습니까?")){
		return;
	}

	$("#formFlag").val("C");
	
	$.ajax({
		url : "/MemberPj/MemberServlet"
		, type : "post"
		, data : $("#fm").serialize()
		, dataType : "json"
		, success : function(data){
			alert("저장 완료!");
		}
		, error : function(xhr) {
			alert("오류!");
			console.log(xhr);
		}
	});
}
