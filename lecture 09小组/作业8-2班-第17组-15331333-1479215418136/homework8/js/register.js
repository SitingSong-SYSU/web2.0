$(function() {
	submit();
	reset();
});

function submit() {
	// alert('test');
	$('form').submit(function() {
		if (!allCanUse()) {
			alert("请按格式输入信息");
			return false;
		}
	});
}

function reset() {
	$("input[type='reset']").click(function(event) {
		$('.tip').html("");
		$('.warn').html("");
	});
}

function allCanUse() {
	checkName();
	checkId();
	checkPhone();
	checkEmail();
	// alert('enter allCanUse')
	if ($('#username_tip').attr('class') == 'warn') return false;
	if ($('#id_tip').attr('class') == 'warn') return false;
	if ($('#phone_tip').attr('class') == 'warn') return false;
	if ($('#email_tip').attr('class') == 'warn') return false;
	// alert("true");
	return true;
}

function canUse(target) {
	target.html('可用');
	target.attr('class', 'tip');
}

function cannotUse(target) {
	target.attr('class', 'warn');
}

function checkName() {
	cannotUse($('#username_tip'));
	var str = $('#username').val();
	if (str.match(/\W/)) {
		$('#username_tip').html('含有非法字符！');
		return;
	}
	if (str.length < 6 || str.length > 18) {
		$('#username_tip').html('6~18位英文字母、数字或下划线，必须以英文字母开头');
		return;
	}
	if (!str.substr(0, 1).match(/[a-zA-Z]/)) {
		$('#username_tip').html('必须以英文字母开头!');
		return;
	}
	canUse($('#username_tip'));
}
function checkId() {
	cannotUse($('#id_tip'));
	var str = $('#id').val();
	if (str.match(/[^0-9]/)) {
		$('#id_tip').html('含有非数字字符！');
		return;
	}
	if (str.length != 8 ) {
		$('#id_tip').html('8位数字，不能以0开头');
		return;
	}
	if (str.substr(0, 1).match(/0/)) {
		$('#id_tip').html('不能以0开头!');
		return;
	}
	canUse($('#id_tip'));
}
function checkPhone() {
	cannotUse($('#phone_tip'));
	var str = $('#phone').val();
	if (str.match(/[^0-9]/)) {
		$('#phone_tip').html('含有非数字字符！');
		return;
	}
	if (str.length != 11) {
		$('#phone_tip').html('11位数字，不能以0开头');
		return;
	}
	if (str.substr(0, 1).match(/0/)) {
		$('#phone_tip').html('不能以0开头!');
		return;
	}
	canUse($('#phone_tip'));
}
function checkEmail() {
	cannotUse($('#email_tip'));
	var str = $('#email').val();
	if (!str.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/)) {
		$('#email_tip').html('邮箱格式非法！');
		return;
	}
	canUse($('#email_tip'));
}