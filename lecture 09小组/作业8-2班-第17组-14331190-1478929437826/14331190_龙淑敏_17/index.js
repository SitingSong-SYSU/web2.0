$(document).ready(function(){
    $("#username").change(checkname);
    $("#studentid").change(checkstudentid);
    $("#phone").change(checkphone);
    $("#mail").change(checkmail);
    $("form").submit(check);
});

function checkname() {
    if (!/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test($(":text").eq(0).val())) {
            alert("用户名为6~18位英文字母、数字或下划线，必须以英文字母开头！");
            return false;
    }
    return true;
}
function checkstudentid() {
    if (!/^[1-9][0-9]{7}$/.test($(":text").eq(1).val())) {
        alert("学号为8位数字，不能以0开头！");
        return false;
    }
    return true;
}
function checkphone() {
    if (!/^[1-9][0-9]{10}$/.test($(":text").eq(2).val())) {
        alert("电话为11位数字，不能以0开头！");
        return false;
    }
    return true;
}
function checkmail() {
    if (!/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test($(":text").eq(3).val())) {
        alert("请输入正确的邮箱地址！");
        return false;
    }
    return true;
}
function check() {
    for (var i = 0; i < $(":text").length; i++) {
        if ($(":text").eq(i).val() == "") {
            alert("请补全信息再提交！");
            return false;
        }
    }
    if (checkname() == false || checkstudentid() == false || checkphone() == false || checkmail() == false)
    return false; 
    return true;
}
