package com;

import java.sql.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.member.model.MemberService;
import com.member.model.MemberVO;

@Controller
public class MyController1 {

	@Autowired
	MemberService memSvc;

	@GetMapping("/")
	public String Myfone() {
		return "form1";
	}

	// 用戶登入
	@PostMapping("/Login")
	public String Login(HttpServletRequest req, HttpSession session, Model model) {
		// 接收資料
		String userAccount = req.getParameter("userAccount");
		String userPassword = req.getParameter("userPassword");

		// 取得資料庫的USER資料
		MemberVO mem = memSvc.getUserData(userAccount);

		// 判斷USER輸入的帳號密碼是否正確
		if (mem == null) {
			System.out.println("查無帳號"); // 查無帳號
		} else if (!userPassword.equals(mem.getMemberPassword())) {
			System.out.println("密碼錯誤"); // 密碼錯誤
		} else {
			System.out.println("密碼正確"); // 密碼正確
			session.setAttribute("memberID", mem.getMemberId());// 帳號密碼正確 存入Session 紀錄登入狀態
			
			return "redirect:frontend/member/memberinfo.html";
		}
		return "frontend/member/memberLogin";
	}
	


	// USER修改資料
	@PostMapping("/userUpData")
	public String userUpData(HttpServletRequest req, HttpSession session, Model model) {
		//取得USER輸入的值
		Object MemberID = session.getAttribute("memberID");
		String inputName = req.getParameter("memberName");
		String inputEmail = req.getParameter("memberEmail");
		String inputPhone = req.getParameter("memberPhone");
		String inputAddrsee = req.getParameter("memberAddress");
		String inputBirthday = req.getParameter("memberBirthday");

		String ID = String.valueOf(MemberID);
		//修改資料
		MemberVO upUserData = memSvc.upUserData(ID, inputName, inputEmail, inputPhone, inputAddrsee, inputBirthday);
		//轉交
		model.addAttribute("memberData", upUserData);

		return "frontend/member/memberinfo.html";
	}

	
	//在註冊頁面 點擊註冊按鈕
	@PostMapping("/Register")
	public String userRepository(HttpServletRequest req, Model model, HttpSession session) {
//		System.out.println("!!註冊!!");
		//取得USER輸入的值
		String userName = req.getParameter("userName");
		String userAccount = req.getParameter("userAccount");
		String userPassword = req.getParameter("userPassword");
		String userPhone = req.getParameter("userPhone");
		String userEmail = req.getParameter("userEmail");
		String userAddress = req.getParameter("userAddress");
		Date userBirthday =Date.valueOf(req.getParameter("userBirthday"));
		Integer userGender =Integer.valueOf(req.getParameter("userGender")) ;
			
//		System.out.println(userName);
//		System.out.println(userAccount);
//		System.out.println(userPassword);
//		System.out.println(userPhone);
//		System.out.println(userEmail);
//		System.out.println(userAddress);
//		System.out.println(userBirthday);
//		System.out.println(userGender);
		//新增帳號
		MemberVO newMember = memSvc.newMember(userName, userAccount, userPassword, userEmail, userPhone, userAddress, userGender, userBirthday);
		//轉交 寫入session保存登入狀態
		model.addAttribute("memberData", newMember);
//		System.out.println(newMember.getMemberId());
		session.setAttribute("memberID", newMember.getMemberId());// 帳號密碼正確 存入Session 紀錄登入狀態
		
		return "frontend/member/memberinfo.html";
	}

}
