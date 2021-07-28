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

	public List<ZipVO> retrieveAddrList(ZipVO zv) throws SQLException {
		return dao.retrieveAddrList(zv);
	}
	
}
