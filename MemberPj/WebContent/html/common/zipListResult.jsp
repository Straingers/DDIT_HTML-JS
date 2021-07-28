<%@page import="kr.or.ddit.common.vo.ZipVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	List<ZipVO> list = (List<ZipVO>) request.getAttribute("list");
%>
[
<%
for(int i = 0; i < list.size(); i ++) {
	if(i > 0){
		%>, <%
	}
	%>
	{ 
		"sido" : "<%=list.get(i).getSido() %>" 
		, "gugun" : "<%=list.get(i).getGugun() %>"
		, "dong" : "<%=list.get(i).getDong() %>"
		, "bunji" : "<%=list.get(i).getBunji() %>"
		, "zipCode" : "<%=list.get(i).getZipcode() %>"
	}
	<%
}
%>
]
