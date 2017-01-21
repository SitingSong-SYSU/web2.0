$(function() {
	initial();
	$("#button").mouseleave(function() {
		var id = setTimeout(initial, 1300);
		$("#button").attr("id_of_settimeout", id);
	});
	$("#button").mouseenter(function() {
		var id = $("#button").attr("id_of_settimeout");
		if (id !== undefined) {
			clearTimeout(id);
		}
	});
	$(".apb").click(atOnclick);
});



function initial() {
	$("#control-ring li").attr("waiting", "false"); // 防止在重置之后受到之前的AJAXresponse，然后执行AJAX的回调函数
	$("#message").text("").hide();
	$(".unread").text("").hide();
	$("#info").text("").hide();
	$("#order").text("");
	turn_on_rings($("#control-ring li"));
	turn_off_info_bar();
}
function control_ring_onclick(event) {
	var is_already_on = $("#control-ring li").filter(function(index, current_li) {
		return $(current_li).hasClass("turnOn");
	}).not(event.currentTarget);
	$(event.currentTarget).unbind("click", control_ring_onclick).children(".unread").show().text("...");
	turn_off_rings($(event.currentTarget).siblings("*"));
	$(event.currentTarget).attr("waiting", "true");

	$.get("/", function(data,status) {
		if ($(event.currentTarget).attr("waiting") !== "true")return;
		$(event.currentTarget).attr("waiting", "false");
		$(event.currentTarget).children(".unread").text(data);
		turn_off_rings($(event.currentTarget));
		turn_on_rings(is_already_on);
		if (is_already_on.length === 0) turn_on_info_bar();
	});
}

function info_bar_onclick() {
	if ($("#info-bar").hasClass("turnOn")) {
		showSum();
		turn_off_info_bar();
	}
}

function showSum() {
	var sum = 0, num, i;
	$(".unread").each(function (index, ele) {
		num = parseInt($(ele).text());
		if (isNaN(num)) sum += 0;
		else sum += num;
	});
	$("#info").show().text(sum);
}

function turn_off_rings(jq_rings) {
	jq_rings.removeClass("turnOn").addClass("turnOff").unbind("click", control_ring_onclick);
}

function turn_on_rings(jq_rings) {
	jq_rings.removeClass("turnOff").addClass("turnOn").bind("click", control_ring_onclick);
}

function turn_off_info_bar() {
	$("#info-bar").removeClass("turnOn").addClass("turnOff").unbind("click", info_bar_onclick);
}
function turn_on_info_bar() {
	$("#info-bar").removeClass("turnOff").addClass("turnOn").bind("click", info_bar_onclick);
}

function atOnclick(event) {
	initial();
	var order = getRandomOrder();
	$("#order").text(order.join(""));
	var callbacks = [];
	for (var i = 0; i < order.length; i++) {
			(function (i) {
				switch(order[i]) {
				case 'A':
					callbacks[i] = function (error, currentSum) {
						aHandler(error, currentSum, callbacks[i+1]);
					};
					break;
				case 'B':
					callbacks[i] = function (error, currentSum) {
						bHandler(error, currentSum, callbacks[i+1]);
					};
					break;
				case 'C':
					callbacks[i] = function (error, currentSum) {
						cHandler(error, currentSum, callbacks[i+1]);
					};
					break;
				case 'D':
					callbacks[i] = function (error, currentSum) {
						dHandler(error, currentSum, callbacks[i+1]);
					};
					break;
				case 'E':
					callbacks[i] = function (error, currentSum) {
						eHandler(error, currentSum, callbacks[i+1]);
					};
					break;
			}
		}) (i);		
	}
	callbacks[order.length] = function (error, currentSum) {
		bubbleHandler(error, currentSum);
	};
	callbacks[0](null, 0);
}

function getRandomOrder() {
	var order = ['A', 'B', 'C', 'D', 'E'];
	order.sort(function() { return 0.5 - Math.random(); });
	return order;
}

function aHandler(error, currentSum, callback) {
	var is_already_on = $("#control-ring li").filter(function(index, current_li) {
		return $(current_li).hasClass("turnOn");
	}).not("#A");
	$("#A").unbind("click", control_ring_onclick).children(".unread").show().text("...");
	turn_off_rings($("#A").siblings("*"));
	$("#A").attr("waiting", "true");

	var fail = (Math.random() > 0.5);
	if (!!error) {
		if (fail) {$("#message").html(error.message).show();}
		else {
			$("#message").html(error.message+"<br>这是个天大的秘密").show();
		}
		currentSum = error.currentSum;
	} else if (!fail) $("#message").html("<br>这是个天大的秘密").show();
	else $("#message").html("");

	$.get("/", function(data,status) {
		if ($("#A").attr("waiting") !== "true") return;
		$("#A").attr("waiting", "false");
		$("#A").children(".unread").text(data);
		turn_off_rings($("#A"));
		turn_on_rings(is_already_on);
		if (is_already_on.length === 0) turn_on_info_bar();

		$("#message").hide();
		if (fail) {
			callback({
				message: "这是个天大的秘密个屁",
				currentSum: currentSum+parseInt(data)
			});
		} else {
			$("#message").text("这是个天大的秘密").show();
			callback(null, currentSum+parseInt(data));
		}
	});
}
function bHandler(error, currentSum, callback) {
	var is_already_on = $("#control-ring li").filter(function(index, current_li) {
		return $(current_li).hasClass("turnOn");
	}).not("#B");
	$("#B").unbind("click", control_ring_onclick).children(".unread").show().text("...");
	turn_off_rings($("#B").siblings("*"));
	$("#B").attr("waiting", "true");

	var fail = (Math.random() > 0.5);
	if (!!error) {
		if (fail) {$("#message").html(error.message).show();}
		else {
			$("#message").html(error.message+"<br>我不知道").show();
		}
		currentSum = error.currentSum;
	} else if (!fail) $("#message").html("<br>我不知道").show();
	else $("#message").html("");

	$.get("/", function(data,status) {
		if ($("#B").attr("waiting") !== "true")return;
		$("#B").attr("waiting", "false");
		$("#B").children(".unread").text(data);
		turn_off_rings($("#B"));
		turn_on_rings(is_already_on);
		if (is_already_on.length === 0) turn_on_info_bar();

		$("#message").hide();
		if (fail) {
			callback({
				message: "我不知道个屁",
				currentSum: currentSum+parseInt(data)
			});
		} else {
			$("#message").text("我不知道").show();
			callback(null, currentSum+parseInt(data));
		}
	});
}
function cHandler(error, currentSum, callback) {
	var is_already_on = $("#control-ring li").filter(function(index, current_li) {
		return $(current_li).hasClass("turnOn");
	}).not("#C");
	$("#C").unbind("click", control_ring_onclick).children(".unread").show().text("...");
	turn_off_rings($("#C").siblings("*"));
	$("#C").attr("waiting", "true");
	
	var fail = (Math.random() > 0.5);
	if (!!error) {
		if (fail) {$("#message").html(error.message).show();}
		else {
			$("#message").html(error.message+"<br>你不知道").show();
		}
		currentSum = error.currentSum;
	} else if (!fail) $("#message").html("<br>你不知道").show();
	else $("#message").html("");

	$.get("/", function(data,status) {
		if ($("#C").attr("waiting") !== "true")return;
		$("#C").attr("waiting", "false");
		$("#C").children(".unread").text(data);
		turn_off_rings($("#C"));
		turn_on_rings(is_already_on);
		if (is_already_on.length === 0) turn_on_info_bar();

		$("#message").hide();
		if (fail) {
			callback({
				message: "你不知道个屁",
				currentSum: currentSum+parseInt(data)
			});
		} else {
			$("#message").text("你不知道").show();
			callback(null, currentSum+parseInt(data));
		}
	});
}
function dHandler(error, currentSum, callback) {
	var is_already_on = $("#control-ring li").filter(function(index, current_li) {
		return $(current_li).hasClass("turnOn");
	}).not("#D");
	$("#D").unbind("click", control_ring_onclick).children(".unread").show().text("...");
	turn_off_rings($("#D").siblings("*"));
	$("#D").attr("waiting", "true");
	
	var fail = (Math.random() > 0.5);
	if (!!error) {
		if (fail) {$("#message").html(error.message).show();}
		else {
			$("#message").html(error.message+"<br>他不知道").show();
		}
		currentSum = error.currentSum;
	} else if (!fail) $("#message").html("<br>他不知道").show();
	else $("#message").html("");

	$.get("/", function(data,status) {
		if ($("#D").attr("waiting") !== "true")return;
		$("#D").attr("waiting", "false");
		$("#D").children(".unread").text(data);
		turn_off_rings($("#D"));
		turn_on_rings(is_already_on);
		if (is_already_on.length === 0) turn_on_info_bar();

		$("#message").hide();
		if (fail) {
			callback({
				message: "他不知道个屁",
				currentSum: currentSum+parseInt(data)
			});
		} else {
			$("#message").text("他不知道").show();
			callback(null, currentSum+parseInt(data));
		}
	});
}
function eHandler(error, currentSum, callback) {
	var is_already_on = $("#control-ring li").filter(function(index, current_li) {
		return $(current_li).hasClass("turnOn");
	}).not("#E");
	$("#E").unbind("click", control_ring_onclick).children(".unread").show().text("...");
	turn_off_rings($("#E").siblings("*"));
	$("#E").attr("waiting", "true");

	var fail = (Math.random() > 0.5);
	if (!!error) {
		if (fail) {$("#message").html(error.message).show();}
		else {
			$("#message").html(error.message+"<br>才怪").show();
		}
		currentSum = error.currentSum;
	} else if (!fail) $("#message").html("<br>才怪").show();
	else $("#message").html("");

	$.get("/", function(data,status) {
		if ($("#E").attr("waiting") !== "true")return;
		$("#E").attr("waiting", "false");
		$("#E").children(".unread").text(data);
		turn_off_rings($("#E"));
		turn_on_rings(is_already_on);
		if (is_already_on.length === 0) turn_on_info_bar();

		$("#message").hide();
		if (fail) {
			callback({
				message: "才怪个屁",
				currentSum: currentSum+parseInt(data)
			});
		} else {
			$("#message").text("才怪").show();
			callback(null, currentSum+parseInt(data));
		}
	});
}
function bubbleHandler(error, currentSum) {
	var fail = (Math.random() > 0.5);
	if (!!error) {
		currentSum = error.currentSum;
		if (fail) {$("#message").html(error.message).show();}
		else {
			$("#message").html(error.message+"<br>楼主异步调用战斗力感人，目测不超过"+currentSum).show();
		}
	} else if (!fail) $("#message").html("<br>楼主异步调用战斗力感人，目测不超过"+currentSum).show();
	else $("#message").html("");

	$("#info-bar").trigger("click");
}