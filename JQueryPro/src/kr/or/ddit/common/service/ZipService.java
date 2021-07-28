package kr.or.ddit.common.service;

import java.sql.SQLException;
import java.util.List;

import kr.or.ddit.common.dao.ZipDao;
import kr.or.ddit.common.vo.ZipVO;

public class ZipService {
	// singleton 패턴 적용
	private ZipDao dao;
	
	public ZipService() {
		if(dao == null)
			dao = new ZipDao();
	}

	public List<ZipVO> retrieveSidoList() throws SQLException {
		return dao.retrieveSidoList();
	}
	
	public List<ZipVO> retrieveGugunList(ZipVO zv) throws SQLException {
		return dao.retrieveGugunList(zv);
	}
	
	public List<ZipVO> retrieveDongList(ZipVO zv) throws SQLException {
		return dao.retrieveDongList(zv);
	}
	
	public List<ZipVO> retrieveZipList(ZipVO zv) throws SQLException {
		return dao.retrieveZipList(zv);
	}
	
}
