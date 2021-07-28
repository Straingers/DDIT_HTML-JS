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
		// TODO Auto-generated method stub
		super.doGet(req, resp);
 	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			
			ZipService zipService = new ZipService();
			
			String flag = req.getParameter("flag");
			
			List<ZipVO> list = new ArrayList<ZipVO>();
	
			if("GU".equals(flag)) {
				ZipVO zv = new ZipVO();
				zv.setSido(req.getParameter("sido"));
				
				list = zipService.retrieveGugunList(zv);
				
			} else if ("DONG".equals(flag)) {
				ZipVO zv = new ZipVO();
				zv.setSido(req.getParameter("sido"));
				zv.setGugun(req.getParameter("gugun"));
				
				list = zipService.retrieveDongList(zv);
			} else if("ZIP".equals(flag)) {
				ZipVO zv = new ZipVO();
				zv.setSido(req.getParameter("sido"));
				zv.setGugun(req.getParameter("gugun"));
				zv.setDong(req.getParameter("dong"));
				
				list = zipService.retrieveZipList(zv);
			}
			
			else {
				list = zipService.retrieveSidoList();
			}
			req.setAttribute("list", list);
			
			RequestDispatcher dispatcher = req.getRequestDispatcher("/html/common/zipListResult.jsp");
			dispatcher.forward(req, resp);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
}
