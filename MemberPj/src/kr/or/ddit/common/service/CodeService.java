package kr.or.ddit.common.service;

import java.sql.SQLException;
import java.util.List;

import kr.or.ddit.common.dao.CodeDao;
import kr.or.ddit.common.vo.CodeVO;

public class CodeService {
	// singleton 패턴 적용
	private CodeDao dao;
	
	public CodeService() {
		if(dao == null)
			dao = new CodeDao();
	}

	public List<CodeVO> retrieveCodeList(CodeVO cv) throws SQLException {
		List<CodeVO> list = dao.retrieveCodeList(cv);
		
		return list;
	}
	
}
