($(function() {
	//去除箭头格式
	function none_UorD(th, index) {
		$.each(th, function(i, item) {
			if (i != index) $(item).removeClass("up").removeClass("down");
		});
	}
	//改变状态
	function UorD(th) {
		if (th.className == "") th.className = "up";
		else if (th.className == "up") th.className = "down";
		else if (th.className == "down") th.className = "up";
	}

	function upcmp(index) {
		return function(a, b) {
			return $($(a).children()[index]).text() > $($(b).children()[index]).text()? 1: -1;
		};
	}
	function downcmp(index) {
		return function(a, b) {
			return $($(a).children()[index]).text() < $($(b).children()[index]).text()? 1: -1;
		};
	}
	//升序
	function upsort(tr, index) {
		var arr = tr.sort(upcmp(index));
		tr.parent().empty().append(arr);
	}
	//降序
	function downsort(tr, index) {
		var arr = tr.sort(downcmp(index));
		tr.parent().empty().append(arr);
	}
	//解决方法
	function solve() {
		$("table th").click(function() {
			var ths = $(this).parents("table");
			none_UorD(ths.find("th"), $(this).index());
		    UorD(this);
		    if ($(this).hasClass("up")) 
		    	upsort(ths.find("tbody tr"), $(this).index());
		    else if ($(this).hasClass("down"))
		    	downsort(ths.find("tbody tr"),$(this).index());
			ths.find("tbody tr:odd").attr("class", "alternate");
			ths.find("tbody tr:even").removeClass();
		});
	}
	//运行
	solve();
}))();