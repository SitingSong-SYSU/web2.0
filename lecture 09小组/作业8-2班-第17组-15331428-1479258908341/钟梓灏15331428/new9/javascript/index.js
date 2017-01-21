$(document).ready(function() {
	var flag1 = 0, flag2 = 0, flag3 = 0, flag4 = 0;
	$('input').bind('click', function(){
		$('p').html('');
		$(this).removeClass('wrong');
	});
	$('#user').bind('blur', function() {
		var value = $('#user').val();
		var tmp = value.match(/^[a-zA-Z]\w{5,17}$/);
		if (tmp == null) {
			$('#user').addClass('wrong');
			flag1 = 0;
			$('#wronguser').html('用户名6-18位可为英文字母、数字或下划线，必须以英文字母开头');
		}
		else {
			$.post('check', value+'0', function(result) {
				if (result === 'true') {
					flag1++;
					$('#wronguser').html('');
				}
				else $('#wronguser').html('用户名重复');
			});
		}
	});
	$('#number').bind('blur', function() {
		var value = $('#number').val();
		var tmp = value.match(/^[^0]\d{7}$/);
		if (tmp == null) {
			$('#number').addClass('wrong');
			flag2 = 0;
			$('#wrongnumber').html('学号8位数字，不能以0开头');
		}
		else {
			$.post('check', value+'1', function(result) {
				if (result === 'true') {
					flag2++;
					$('#wrongnumber').html('');
				}
				else $('#wrongnumber').html('学号重复');
			});
		}
	});
	$('#phone').bind('blur', function() {
		var value = $('#phone').val();
		var tmp = value.match(/^[^0]\d{10}$/);
		if (tmp == null) {
			$('#phone').addClass('wrong');
			flag3 = 0;
			$('#wrongphone').html('电话11位数字，不能以0开头');
		}
		else {
			$.post('check', value+'2', function(result) {
				if (result === 'true') {
					flag3++;
					$('#wrongphone').html('');
				}
				else $('#wrongphone').html('电话重复');
			});
		}
	});
	$('#email').bind('blur', function() {
		var value = $('#email').val();
		var tmp = value.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/);
		if (tmp == null) {
			$('#email').addClass('wrong');
			flag4 = 0;
			$('#wrongemail').html('邮箱除@与.外只含有字母');
		}
		else {
			$.post('check', value+'3', function(result) {
				if (result === 'true') {
					flag4++;
					$('#wrongemail').html('');
				}
				else $('#wrongemail').html('邮箱重复');
			});
		}
	});
	$('#submit').bind('click', function() {
		if (flag1 != 0 && flag2 != 0 && flag3 != 0 && flag4 != 0) {
			$('#submit').attr('type','submit');
		}
		else $('#wrongsubmit').html('请完整填写信息');
	});
	$('#reset').bind('click', function() {
		$('p').html('');
		$('.input').removeClass('wrong');
	});
});