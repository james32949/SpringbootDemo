//取消修改按鈕功能
$(document).ready(function () {
  $('#buttonUpData').attr('disabled', true)
  console.log(document.cookie)

})

var emailState = 0;
var phoneState = 0;
var nameState = 0;
var address = 0;

//名稱欄位
$('#memberName').change(function(){
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

//電話欄位
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
$('#memberAddress').change(function(){
  $('#buttonUpData').attr('disabled', false)
})