package com.member.model;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public interface MemberRepository extends JpaRepository<MemberVO, Integer>{

	@Query(nativeQuery = true, value = "SELECT member_id FROM member WHERE member_account =?1")
	Integer findUserByAccount(String account);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value ="UPDATE member SET member_name=?1, member_email=?2, member_phone=?3, member_address=?4, member_birthday=?5 WHERE member_id=?6")
	int upData(String memberName, String memberEmail, String memberPhone, String memberAddress, Date memberBirthday, String memberId);
	
	boolean existsBymemberAccount(String memberAccount);
	
	boolean existsBymemberPhone(String memberPhone);
	
	boolean existsBymemberEmail(String memberEmail);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "UPDATE member SET member_img=?1 WHERE(member_id=?2)")
	void upImg(byte[] buf, String ID);
	
}
