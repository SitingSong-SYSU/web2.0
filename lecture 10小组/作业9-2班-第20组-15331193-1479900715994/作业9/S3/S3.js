(function() {
	$(function() { new S3(); });
	function S3() {
		$(".unread").hide();
		this.Listener();
	}
	var p = S3.prototype;
	var flag = [0, 0, 0, 0, 0];
	var aj = [];
	p.Listener = function() {
		$("#button").mouseleave(reset);
		$(".apb").click(getNum);
	};
	var getNum = function() {
		$(".button").click(buttonClickListener);
		$("#info-bar").click(infoBarCickListener);
		$('ul').children().eq(0).click();
		reset();
		for (var j = 0; j < 5; j++) {
			$('ul').children().eq(j).find("span").show();
			$('ul').children().eq(j).find("span").html("...");
			(function (key) {
				aj[key+1] = $.get("127.0.0.1?time="+Math.random(), function(data, status) {
					$('ul').children().eq(key).find("span").html(data);
					flag[key] = 1;
					$('ul').children().eq(key).addClass('changeGray');
					$("#info-bar").click();
				});
			}) (j);
		}
	};
	var buttonClickListener = function() {
		var that = this;
		var index = ($('.unread').index($(that).find("span")));
		if (flag[index] === 1) return;
		$(that).find("span").html("...");
		$(that).find("span").show();
		$('li').not(this).addClass('changeGray');
		aj[0] = $.get("127.0.0.1", function(data,status) {});
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
		for (var i = 0; i < aj.length; i++)
			aj[i].abort();
		flag = [0, 0, 0, 0, 0];
		$("#info-bar").css({"background-color":"#7E7E7E"});
		$(".unread").hide();
		$('#sum').html("");
		$('li').removeClass('changeGray');
	};
}) ();