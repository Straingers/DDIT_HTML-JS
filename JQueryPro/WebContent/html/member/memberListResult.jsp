<%@page import="kr.or.ddit.member.vo.MemberVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
[
<% 
//서블릿에서 조회결과를 "list"라는 key로 request에 담아줌
List<MemberVO> list = (List<MemberVO>) request.getAttribute("list");

for(int i = 0; i < list.size(); i++){
		MemberVO mv = list.get(i);
		String memId = mv.getMemId();
		String memName = mv.getMemName();
		String memPass = mv.getMemPass();
		String memHp = mv.getMemHp();
		String memBir = mv.getMemBir();
		String memMail = mv.getMemMail();
		String memJobName = mv.getMemJobName();
		
		
		// json 타입으로 만들어야 하는 부분 ==> {name : "~", id : "~"}
		if(i > 0){
			%>, <%	
		}
		%>
		{
		"memId" : "<%=memId %>"
		, "memName" : "<%=memName %>"
		, "memPass" : "<%=memPass %>"
		, "memBir" : "<%=memBir %>"
		, "memHp" : "<%=memHp %>"
		, "memMail" : "<%=memMail %>"
		, "memJobName" : "<%=memJobName %>"
		}
		<% 
	}
%>
]


