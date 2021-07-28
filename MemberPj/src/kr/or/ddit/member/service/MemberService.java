package kr.or.ddit.member.service;

import java.sql.SQLException;
import java.util.List;

import kr.or.ddit.member.dao.MemberDao;
import kr.or.ddit.member.vo.MemberVO;

public class MemberService {
	// singleton 패턴 적용
	private MemberDao dao;
	
	public MemberService() {
		if(dao == null)
			dao = new MemberDao();
	}
	
	public MemberVO retrieveMember(String memId) throws SQLException {
		MemberVO mv = dao.retrieveMember(memId);
		return mv;
	}

	public void createMember(MemberVO memberVo) throws SQLException {

		MemberVO resultVo = dao.retrieveMember(memberVo.getMemId());
		if(resultVo != null) {
			return;
		}

		dao.createMember(memberVo);
	}
	
}
