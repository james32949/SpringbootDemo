
//取消修改按鈕功能
$(document).ready(function () {
  // console.log(document.cookie)
  $('#buttonUpData').attr('disabled', true)
  $('#newPassword').attr('disabled', true)

})

var emailState = 0;
var phoneState = 0;
var nameState = 0;
var address = 0;

//名稱欄位檢查
$('#memberName').change(function () {
  $('#buttonUpData').attr('disabled', false)
})

//信箱欄位
$('#memberEmail').change(function () {
  // console.log('OK')


  let inputEmail = $('#memberEmail').val()
  //正規表示法
  let regexEmail = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm

  // console.log(inputEmail)

  if (inputEmail == "") {
    console.log('信箱欄位為空值')

    $('#emailError').html('*信箱欄位不能為空')
    emailState = 1;
    $('#buttonUpData').attr('disabled', true)

  } else if (!regexEmail.test(inputEmail)) {

    $('#emailError').html('*信箱格式錯誤')
    emailState = 1;
    $('#buttonUpData').attr('disabled', true)
  } else {
    $.post({
      url: '/frontend/member/Ajax',
      data: {
        "inputColumn": "Email",
        "inputEmail": inputEmail
      },
      datatype: "json",
      success: function (data) {

        if (data.inputEmail) {
          $('#emailError').html('*此信箱已被使用')
          emailState = 1;
          $('#buttonUpData').attr('disabled', true)
        } else {
          $('#emailError').html('')
          emailState = 0;
          if (0 === emailState && 0 === phoneState) {
            $('#buttonUpData').attr('disabled', false)
          }


        }
      }
    })
  }
})

//電話欄位檢查
$('#memberPhone').change(function () {
  // console.log('OK')

  let inputPhone = $('#memberPhone').val()
  //正規表示法
  let regexPhone = /^09\d{8}$/g

  // console.log(inputEmail)

  if (inputPhone == "") {

    $('#phoneError').html('*電話欄位不能為空')
    phoneState = 1;
    $('#buttonUpData').attr('disabled', true)

  } else if (!regexPhone.test(inputPhone)) {

    $('#phoneError').html('*電話格式錯誤')
    phoneState = 1;
    $('#buttonUpData').attr('disabled', true)
  } else {
    $.post({
      url: '/frontend/member/Ajax',
      data: {
        "inputColumn": "Phone",
        "inputPhone": inputPhone
      },
      datatype: "json",
      success: function (data) {

        if (data.inputPhone) {
          $('#phoneError').html('*此電話已被使用')
          phoneState = 1;
          $('#buttonUpData').attr('disabled', true)
        } else {
          $('#phoneError').html('')
          phoneState = 0;
          if (0 === emailState && 0 === phoneState) {
            $('#buttonUpData').attr('disabled', false)
          }

        }
      }
    })
  }
})



//圖片預覽
var reader = new FileReader();
$('#formFile').on('change', function () {
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener('load', function () {
    let img_html = `<img src="${reader.result}">`;
    $('#preview').html(img_html);
  })
  $('#buttonUpData').attr('disabled', false)
})

//地址欄位
$('#memberAddress').change(function () {
  $('#buttonUpData').attr('disabled', false)
})

//取得驗證碼
$('#getAuthCode').click(function () {
  // console.log('OK')

  $.get({
    url: '/redis/getAuthCode',
    success: function (data) {
      // console.log(data)
      let html_AuthCode = `<h1>` + data + `</h1>`;

      $('#returnAuthCode').html(html_AuthCode)

    }
  })
})

//確認驗證碼
$('#checkAuthCode').click(function () {
  // console.log('OK')

  let inputAuthCode = $('#inputAuthCode').val()
  // console.log(inputAuthCode)
  let id = getCookie('MemberID')
  $.post({
    url: '/frontend/member/checkAuthCode',
    data: {
      "inputAuthCode": inputAuthCode,
      "MemberID": id
    },
    datatype: 'json',
    success: function (data) {
      // console.log(data.checkAuthCode)

      switch (data.checkAuthCode) {
        case '404':
          $('#errorText').html('連結已逾時，請重新申請');
          break;
        case '200':
          $('#errorText').html('');
          $('#cloose_button').click()
          $('#div_button_checkAuthCode').html('<button type="button" class="btn btn-success">已驗證</button>')
          break;
        case '400':
          $('#errorText').html('驗證碼有誤，請重新輸入');
          break;
      }
    }
  })
})

//修改密碼 確認送出按鈕
$('#newPassword').click(function () {
  console.log('OK')
})