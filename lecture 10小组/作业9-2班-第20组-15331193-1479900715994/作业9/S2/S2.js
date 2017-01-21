(function() {
	$(function() { new S2(); });
	function S2() {
		$(".unread").hide();
		this.Listener();
	}
	var p = S2.prototype;
	var flag = [0, 0, 0, 0, 0];
	var aj, isrun = 0;
	p.Listener = function() {
		$("#button").mouseleave(reset);
		$(".apb").click(getNum);
	};
	var getNum = function() {
		$(".button").click(buttonClickListener);
		$("#info-bar").click(infoBarCickListener);
		$('ul').children().eq(0).click();
		reset();
		current_click(0);
	};
	function current_click(i) {
		if (i === 5){
			$("#info-bar").click();
			return;
		}
		if (isrun) return;
		else isrun = 1;
		var that = $('ul').children().eq(i);
		var index = ($('.unread').index($(that).find("span")));
		if (flag[index] === 1) return;
		$(that).find("span").html("...");
		$(that).find("span").show();
		$('li').not(that).addClass('changeGray');
		aj = $.get("127.0.0.1", function(data,status) {
			$(that).find("span").html(data);
			flag[index] = 1;
			$(that).addClass('changeGray');
			var count = 0;
			for (var j = 0; j < 5; j++) {
				if (flag[j] === 1) count++;
				else
					$('ul').children().eq(j).removeClass('changeGray');
			}
			if (count === 5) {
				$("#info-bar").css({"background-color":"blue"});
			}
			isrun = 0;
			current_click(++i);
		});
	}
	var buttonClickListener = function() {
		if (isrun) return;
		else isrun = 1;
		var that = this;
		var index = ($('.unread').index($(that).find("span")));
		if (flag[index] === 1) return;
		$(that).find("span").html("...");
		$(that).find("span").show();
		$('li').not(this).addClass('changeGray');
		aj = $.get("127.0.0.1", function(data,status) {});
	};
	var infoBarCickListener = function() {
		var count = 0;
			for (var j = 0; j < 5; j++) {
				if (flag[j] === 1) count++;
			}
			if (count !== 5) return;
		var sum = 0;
		var nums = document.getElementsByClassName("unread");
		for (var i = 0; i < 5; i++)
			sum += parseInt(nums[i].innerHTML);
		$('#sum').html(sum);
		$("#info-bar").css({"background-color":"#7E7E7E"});
	};
	var reset = function() {
		isrun = 0;
		aj.abort();
		flag = [0, 0, 0, 0, 0];
		$(".unread").hide();
		$('#sum').html("");
		$('li').removeClass('changeGray');
	};
}) ();