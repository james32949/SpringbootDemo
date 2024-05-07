package com.member.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.member.model.MemberService;
import com.member.model.MemberVO;

@Controller
@RequestMapping("/frontend/member")
public class FrontendMemberController {

	@Autowired
	MemberService memSvc;

	// 登入頁面
	@GetMapping("/memberLogin.html")
	public String memberLogin() {
		return "frontend/member/memberLogin";
	}

	// 登入頁面點擊註冊 轉跳至註冊頁面
	@GetMapping("/memberRegister")
	public String Repository() {
		return "frontend/member/memberRegister";
	}

	// 會員資料頁面
	@GetMapping("/memberinfo.html")
	public String memberInfo(HttpSession session, Model model) {
		Integer userId = (Integer) session.getAttribute("memberID"); // 取得session內的值

		MemberVO mem = memSvc.getOneMember(userId); // 查找會員資料
		model.addAttribute("memberData", mem); // 轉交
		return "frontend/member/memberinfo";
	}

	//註冊頁面傳來的ajax請求 對有唯一值的欄位進行檢查
	@PostMapping("/Ajax")
	public void ajax(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("application/json; charset=UTF-8");
		
		String inputColumn = req.getParameter("inputColumn");
		System.out.println(inputColumn);
		
		//檢查輸入欄位
		switch (inputColumn) {
		case "Account":
			String inputAccount = req.getParameter("inputAccount"); //取得UESR輸入資料
			Boolean acc = memSvc.checkAccount(inputAccount);  //檢查資料庫資料 判斷有無重複

			JSONObject objAccount = new JSONObject(); //使用JSON回傳結果
			if (acc) {
				objAccount.put("inputAccount", true);
				res.getWriter().print(objAccount);
			} else {
				objAccount.put("inputAccount", false);
				res.getWriter().print(objAccount);
			}
			break;
		case "Phone":
			String inputPhone = req.getParameter("inputPhone"); //取得UESR輸入資料
			Boolean phone = memSvc.checkPhone(inputPhone);  //檢查資料庫資料 判斷有無重複

			JSONObject objPhone = new JSONObject();  //使用JSON回傳結果
			if (phone) {
				objPhone.put("inputPhone", true);
				res.getWriter().print(objPhone);
			} else {
				objPhone.put("inputPhone", false);
				res.getWriter().print(objPhone);
			}
			break;
		case "Email":
			String inputEmail = req.getParameter("inputEmail"); //取得UESR輸入資料
			Boolean email = memSvc.checkEmail(inputEmail);  //檢查資料庫資料 判斷有無重複

			JSONObject objEmail = new JSONObject(); //使用JSON回傳結果
			if (email) {
				objEmail.put("inputEmail", true);
				res.getWriter().print(objEmail);
			} else {
				objEmail.put("inputEmail", false);
				res.getWriter().print(objEmail);
			}
			break;
		}

	}

}
