package com.member.model;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("memberService")
public class MemberService {

	@Autowired
	MemberRepository repository;

	// 所有會員資料
	public List<MemberVO> getAll() {
		return repository.findAll();
	}

	// 使用PK查詢會員狀態並修改
	public MemberVO memberStateFindById(Integer id) {
		Optional<MemberVO> mem = repository.findById(id);
		MemberVO member = mem.get();
		if (member.getMemberState() == 2) { // 判斷用戶是否停權
			member.setMemberState(0); // 狀態2(停權) 設置為0復原
			MemberVO upMemberState = repository.save(member);
			return upMemberState;
		} else { // 狀態不為2(狀態正常) 設置為2停權
			member.setMemberState(2);
			MemberVO upMemberState = repository.save(member);
			return upMemberState;
		}
	}

	// 查詢會員資料
	public MemberVO getOneMember(Integer id) {
		Optional<MemberVO> mem = repository.findById(id);
		MemberVO member = mem.get();
		return member;
	}

	// 透過Account查詢會員資料
	public MemberVO getUserData(String account) {
		Integer userId = repository.findUserByAccount(account);
		if (userId == null) {
			return null;
		} else {
			Optional<MemberVO> user = repository.findById(userId);
			MemberVO userData = user.get();
			return userData;
		}
	}

	// 用戶修改資料
	public MemberVO upUserData(String memberId, String inputName, String inputEmail, String inputPhone,
			String inputAddrsee, String inputBirthday) {
		
		int upData = repository.upData(inputName, inputEmail, inputPhone, inputAddrsee, Date.valueOf(inputBirthday), memberId);
//		System.out.println(upData);
		MemberVO newData = repository.findById(Integer.valueOf(memberId)).get();
		return newData;
	}

	public MemberVO newMember(String Name, String Account, String Password,String Email, String Phone, String Address, Integer Gender, Date Birthday) {
		MemberVO mem =new MemberVO();
		
		mem.setMemberName(Name);
		mem.setMemberAccount(Account);
		mem.setMemberPassword(Password);
		mem.setMemberEmail(Email);
		mem.setMemberPhone(Phone);
		mem.setMemberAddress(Address);
		mem.setMemberState(0);
		mem.setMemberGender(Gender);
		mem.setMemberBirthday(Birthday);
		
		MemberVO newMember = repository.save(mem);
		return newMember;
	}

}