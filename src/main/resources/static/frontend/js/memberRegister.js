//JS 動態路徑
var MyPoint = "/Ajax"; 
var host = window.location.host;
var path = window.location.pathname;
var webCtx = path.substring(0, path.indexOf('/', 1));
var endPointURL = "http://" + window.location.host + webCtx + MyPoint;

//名稱欄位
$('#inputName').blur(function(){

    let inputName = $('#inputName').val()
    // console.log('名稱:'+inputName)

    if(inputName == ""){
        // console.log('名稱不能為空')
        $('#nameError').html('名稱不能為空')
        $('#inputName').removeClass().addClass('form-control is-invalid')
        $('#bittonLogin').attr('disabled',true)
    } else{
        $('#inputName').removeClass().addClass('form-control is-valid')
        $('#bittonLogin').attr('disabled',false)
    }   
})
//檢查帳號欄位
$('#inputAccount').blur(function(){

    let inputAccount = $('#inputAccount').val()
    // console.log('帳號:'+inputAccount)

    if(inputAccount == ""){
        // console.log('帳號不能為空')
        $('#AccountError').html('帳號不能為空')
        $('#inputAccount').removeClass().addClass('form-control is-invalid')
        $('#bittonLogin').attr('disabled',true)
    } else{
        $('#inputAccount').removeClass().addClass('form-control')

        $.post({
            url:'/demo/frontend/member/Ajax',
            data:{
                "inputColumn" : "Account",
                "inputAccount": inputAccount
            },
            datatype:'json',
            success:function(data){
                // console.log(data)
                // console.log(data.inputAccount)

                if(data.inputAccount){
                    $('#AccountError').html('此帳號已被使用')
                    $('#inputAccount').removeClass().addClass('form-control is-invalid')
                    $('#bittonLogin').attr('disabled',true)
                } else {
                    $('#inputAccount').removeClass().addClass('form-control is-valid')
                    $('#bittonLogin').attr('disabled',false)
                }
            }
        })

    }   
})
//密碼欄位
$('#inputPassword').blur(function(){

    let inputPassword = $('#inputPassword').val()
    // console.log('密碼:'+inputPassword)

    if(inputPassword == ""){
        // console.log('密碼不能為空')
        $('#PasswordError').html('密碼不能為空')
        $('#inputPassword').removeClass().addClass('form-control is-invalid')
        $('#bittonLogin').attr('disabled',true)
    } else{
        $('#inputPassword').removeClass().addClass('form-control is-valid')
        $('#bittonLogin').attr('disabled',false)
    }   
})

//確認密碼欄位
$('#checkPassword').blur(function(){
    
    let inputPassword = $('#inputPassword').val()
    let checkPassword = $('#checkPassword').val()
    // console.log('密碼:'+inputPassword)
    // console.log('確認密碼'+checkPassword)

    if(checkPassword == ""){
        // console.log('此欄位不能為空')
        $('#checkPasswordError').html('此欄位不能為空')
        $('#checkPassword').removeClass().addClass('form-control is-invalid')
        $('#bittonLogin').attr('disabled',true)
    } else if(inputPassword != checkPassword){
        $('#checkPassword').removeClass().addClass('form-control is-invalid')
        $('#checkPasswordError').html('輸入密碼不相同')
        $('#bittonLogin').attr('disabled',true)
    }   else{
        $('#checkPassword').removeClass().addClass('form-control is-valid')
        $('#bittonLogin').attr('disabled',false)
    }
})


//檢查電話欄位
$('#inputPhone').blur(function(){

    let inputPhone = $('#inputPhone').val()
    // console.log('電話:'+inputAccount)

    if(inputPhone == ""){
        // console.log('電話不能為空')
        $('#PhoenError').html('電話不能為空')
        $('#inputPhone').removeClass().addClass('form-control is-invalid')
        $('#bittonLogin').attr('disabled',true)
    } else{
        $('#inputPhone').removeClass().addClass('form-control')

        $.post({
            url:'/demo/frontend/member/Ajax',
            data:{
                "inputColumn" : "Phone",
                "inputPhone": inputPhone
            },
            datatype:'json',
            success:function(data){
                // console.log(data)
                // console.log(data.inputPhone)

                if(data.inputPhone){
                    $('#PhoenError').html('此電話已被使用')
                    $('#inputPhone').removeClass().addClass('form-control is-invalid')
                    $('#bittonLogin').attr('disabled',true)
                } else {
                    $('#inputPhone').removeClass().addClass('form-control is-valid')
                    $('#bittonLogin').attr('disabled',false)
                }
            }
        })

    }   
})

//檢查信箱欄位
$('#inputEmail').blur(function(){

    let inputEmail = $('#inputEmail').val()
    // console.log('信箱:'+inputAccount)

    if(inputEmail == ""){
        // console.log('信箱不能為空')
        $('#EmailError').html('信箱不能為空')
        $('#inputEmail').removeClass().addClass('form-control is-invalid')
        $('#bittonLogin').attr('disabled',true)
    } else{
        $('#inputEmail').removeClass().addClass('form-control')

        $.post({
            url:'/demo/frontend/member/Ajax',
            data:{
                "inputColumn" : "Email",
                "inputEmail": inputEmail
            },
            datatype:'json',
            success:function(data){
                // console.log(data)
                // console.log(data.inputEmail)

                if(data.inputEmail){
                    $('#EmailError').html('此信箱已被使用')
                    $('#inputEmail').removeClass().addClass('form-control is-invalid')
                    $('#bittonLogin').attr('disabled',true)
                } else {
                    $('#inputEmail').removeClass().addClass('form-control is-valid')
                    $('#bittonLogin').attr('disabled',false)
                }
            }
        })

    }   
})