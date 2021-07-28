/**
 * 
 */
$(document).ready(function(){
	$("#btnSearch").click(function() {
		
		// 서버로 전달할 데이터 만들기
		var userId = $("#userId").val();
		var userName = $("#userName").val();
		var param = {
				memId : userId
				, memName : userName
				, flag : "L"
		};
		$.ajax({
			url : "/JQueryPro/MemberServlet"
			, type : "post"
			, data : param
			, dataType : "json"
			, success : function(data){
// 				alert("성공!");
				console.log(data);
				makeTable(data);
			}
			, error : function(xhr){
				console.log(xhr);
				alert("오류발생");
			}
		});
	});
});

function makeTable(data){
	var str = "";
	if(data.length > 0){
		for(i = 0; i < data.length; i++){
			str += "<tr><td>" + (i+1) + "</td>" 
				+ "<td>" + data[i].memId + "</td>"
				+ "<td>" + data[i].memName + "</td>"
				+ "<td>" + data[i].memPass + "</td>"
				+ "<td>" + format(data[i].memHp, "hp") + "</td>"
				+ "<td>" + data[i].memBir + "</td>"
				+ "<td>" + data[i].memMail + "</td>"
				+ "<td>" + data[i].memJobName + "</td></tr>";
		}
	} else {
		str += "<tr>"
			+ "<td colspan='8' align='center'>등록된 회원이 없습니다.</td>"
			+ "</tr>";
	}
	$("#tbResult tbody").html(str);
}
