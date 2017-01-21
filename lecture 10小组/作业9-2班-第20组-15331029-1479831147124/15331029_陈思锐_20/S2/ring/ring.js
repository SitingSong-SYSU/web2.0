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
	$(".apb").click(atOnClick);
});


function initial() {
	$("#control-ring li").attr("waiting", "false"); // 防止在重置之后受到之前的AJAXresponse，然后执行AJAX的回调函数
	$(".unread").text("").hide();
	$("#info").text("").hide();
	turn_on_rings($("#control-ring li"));
	turn_off_info_bar();
}
function control_ring_onclick(event, callback) {
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
		if (callback !== undefined) callback();
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

function atOnClick() {
	initial();
	$("#A").trigger("click", function() {
		$("#B").trigger("click", function() {
			$("#C").trigger("click", function() {
				$("#D").trigger("click", function() {
					$("#E").trigger("click", function() {
						$("#info-bar").trigger("click", function() {});
					});
				});
			});
		});
	});
}