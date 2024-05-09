

$('#Button_Login').click(function () {

  let inputAccount = $('#userAccount').val()
  let inputPassword = $('#userPassword').val()

  //帳號
  if (inputAccount == "") {
    $('#AccountErrorMessage').html('帳號不能為空')
    $('#buttonUpData').attr('disabled', true)
  }

  //密碼
  if (inputPassword == "") {
    $('#PasswordErrorMessage').html('密碼不能為空')
    $('#Button_Login').attr('disabled', true)
  }

  if (inputAccount !== "" && inputPassword !== ""){
    $.post({
      url:'/Login',
      data: {
        'userAccount': inputAccount,
        'userPassword': inputPassword
      },
      datatype: 'json',
      success: function(data){


        if(data.State){
          window.location.reload()
        } else {
          $('#errorMessage').html('帳號或密碼錯誤')
        }
      }
    })
  }


})

$('#userAccount, #userPassword').change(function () {
  let inputAccount = $('#userAccount').val()
  let inputPassword = $('#userPassword').val()

  if (inputAccount !== "" && inputPassword !== "") {
    $('#AccountErrorMessage').html('')
    $('#PasswordErrorMessage').html('')
    $('#Button_Login').attr('disabled', false)
  }
})
//會員專區按鈕
$('#memberField').click(function(e){
  e.preventDefault();

  //取得指定Cookie JS無法直接取得指定cookie 的Key-value 需要自己寫function取得
  function getCookie(cookieName) {  // 自訂function
		const strCookie = document.cookie
		const cookieList = strCookie.split(';')
		for (let i = 0; i < cookieList.length; i++) {
			const arr = cookieList[i].split('=')
			if (cookieName === arr[0].trim()) {
				return arr[1]
			}
		}
	}
  //判斷登入狀態
	$(document).ready(function() { //ready事件
		//判斷燈入狀態 有-->個人頁面 無-->提示登入
		if (getCookie('LogInState') != null) { 
			window.location.href= '/frontend/member/memberinfo';
		} else {
      alert('請先登入')
			$('#LoginButton').click();
		}
	})

})