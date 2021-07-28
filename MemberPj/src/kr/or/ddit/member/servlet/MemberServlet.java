package kr.or.ddit.member.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import kr.or.ddit.member.service.MemberService;
import kr.or.ddit.member.vo.MemberVO;

@WebServlet("/MemberServlet")
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp);
 	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String flag = req.getParameter("flag");
		
		try {
			if ("C".equals(flag)) {
				
				createMember(req);
				
				req.setAttribute("resultCnt", 1);
				RequestDispatcher disp = req.getRequestDispatcher("/html/common/checkResult.jsp");
				
				disp.forward(req, resp);
				
			} else if ("CHKID".equals(flag)) {
				
				MemberVO mv = checkMemberId(req);
				
				int resultCnt = 0;
				if(mv != null) {
					resultCnt = 1;
				}
				req.setAttribute("resultCnt", resultCnt);
				
				RequestDispatcher disp = req.getRequestDispatcher("/html/common/checkResult.jsp");
				disp.forward(req, resp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private MemberVO checkMemberId(HttpServletRequest req) throws SQLException {
		
		String memId = req.getParameter("memId");
		
		MemberService service = new MemberService();
		
		MemberVO mv = service.retrieveMember(memId);
		
		return mv;
	}
	
	private void createMember(HttpServletRequest req) throws Exception {

		MemberVO memberVO = new MemberVO();
		BeanUtils.populate(memberVO, req.getParameterMap());
		
		MemberService service = new MemberService();
		
		service.createMember(memberVO);
	}
}
