//JS 動態路徑
var MyPoint = "/frontend/member/memberRegister"; //對應XML的 <url-pattern>/Ajax</url-pattern>  記得檢查路徑是否正確
var host = window.location.host;
var path = window.location.pathname;
var webCtx = path.substring(0, path.indexOf('/', 1));
var endPointURL = "http://" + window.location.host + webCtx + MyPoint;

$('#buttonRegister').on('click',function(){
    window.location.href=endPointURL
})
