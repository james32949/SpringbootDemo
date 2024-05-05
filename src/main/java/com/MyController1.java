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

	// 會員資料頁面
	@GetMapping("/frontend/member/memberinfo.html")
	public String memberInfo(HttpSession session, Model model) {
		Integer userId = (Integer) session.getAttribute("memberID"); // 取得session內的值

		MemberVO mem = memSvc.getOneMember(userId); // 查找會員資料
		model.addAttribute("memberData", mem); // 轉交
		return "frontend/member/memberinfo";
	}

	// 登入頁面
	@GetMapping("/frontend/member/memberLogin.html")
	public String memberLogin() {
		return "frontend/member/memberLogin";
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
			session.setAttribute("memberID", mem.getMemberId());
			session.setAttribute("userAccount", userAccount); // 帳號密碼正確 將Account 存入Session
			return "redirect:frontend/member/memberinfo.html";
		}
		return "frontend/member/memberLogin";
	}
	
	//登入頁面點擊註冊 轉跳至註冊頁面
	@GetMapping("/frontend/member/memberRegister")
	public String Repository() {
		return "frontend/member/memberRegister";
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
	public String userRepository(HttpServletRequest req, Model model) {
		System.out.println("!!註冊!!");
		
		String userName = req.getParameter("userName");
		String userAccount = req.getParameter("userAccount");
		String userPassword = req.getParameter("userPassword");
		String userPhone = req.getParameter("userPhone");
		String userEmail = req.getParameter("userEmail");
		String userAddress = req.getParameter("userAddress");
		Date userBirthday =Date.valueOf(req.getParameter("userBirthday"));
		Integer userGender =Integer.valueOf(req.getParameter("userGender")) ;
		
			
		
		System.out.println(userName);
		System.out.println(userAccount);
		System.out.println(userPassword);
		System.out.println(userPhone);
		System.out.println(userEmail);
		System.out.println(userAddress);
		System.out.println(userBirthday);
		System.out.println(userGender);
		
		MemberVO newMember = memSvc.newMember(userName, userAccount, userPassword, userEmail, userPhone, userAddress, userGender, userBirthday);
		
		model.addAttribute("memberData", newMember);
		
		return "frontend/member/memberRegister.html";
	}

}
