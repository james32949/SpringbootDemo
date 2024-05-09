

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