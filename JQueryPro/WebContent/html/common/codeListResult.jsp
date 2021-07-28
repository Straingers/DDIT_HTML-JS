<%@page import="java.util.List"%>
<%@page import="kr.or.ddit.common.vo.CodeVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
[
<%
	List<CodeVO> list = (List<CodeVO>) request.getAttribute("list");

	for(int i = 0; i < list.size(); i++){
		if (i > 0){
			%>, <%
		}
%>
{
	"value" : "<%=list.get(i).getCode() %>"
	, "name" : "<%=list.get(i).getCodeName() %>"
}
<%
	}
%>
]