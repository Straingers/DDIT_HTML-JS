package kr.or.ddit.common.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.common.dao.ZipDao;
import kr.or.ddit.common.service.CodeService;
import kr.or.ddit.common.service.ZipService;
import kr.or.ddit.common.vo.CodeVO;
import kr.or.ddit.common.vo.ZipVO;

@WebServlet("/ZipServlet")
public class ZipServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp);
 	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			
			ZipService zipService = new ZipService();
			
			String flag = req.getParameter("flag");
			
			List<ZipVO> list = new ArrayList<ZipVO>();
	
			if ("DONG".equals(flag)) {
				ZipVO zv = new ZipVO();
				
				zv.setDong(req.getParameter("dong"));
				
				list = zipService.retrieveAddrList(zv);
			} 
			
			req.setAttribute("list", list);
			
			RequestDispatcher dispatcher = req.getRequestDispatcher("/html/member/addrResult.jsp");
			dispatcher.forward(req, resp);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
}
