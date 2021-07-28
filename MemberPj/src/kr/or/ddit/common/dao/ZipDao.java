package kr.or.ddit.common.dao;

import java.sql.SQLException;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.base.dao.BaseDao;
import kr.or.ddit.common.vo.ZipVO;

public class ZipDao extends BaseDao {
	private SqlMapClient smc;
	
	public ZipDao() {
		smc = super.getSqlMapClient();
	}
	
	public List<ZipVO> retrieveAddrList(ZipVO zv) throws SQLException {
		return smc.queryForList("zip.retrieveAddrList", zv);
	}
}
