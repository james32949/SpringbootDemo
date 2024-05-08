//JS 動態路徑
var MyPoint = "/member/memberRegister"; 
var host = window.location.host;
var path = window.location.pathname;
var webCtx = path.substring(0, path.indexOf('/', 1));
var endPointURL = "http://" + window.location.host + webCtx + MyPoint;
//註冊按鈕
$('#buttonRegister').on('click',function(){
    window.location.href=endPointURL
})
