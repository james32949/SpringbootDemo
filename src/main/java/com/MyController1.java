package com;

import java.sql.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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


	




	


}
