$(function() {
	var hasClicked = [0, 0, 0, 0, 0],
		littleCircus = $(".button"),
		redCircus = $(".unread"),
		count = 0,
		sum = 0;

	$("#button").mouseleave(function() {
		for (var i = 0; i < 5; i++) {
			littleCircus[i].style.background = "blue";
			redCircus[i].style.opacity = 0;
			redCircus[i].innerHTML = "";
		}
		count = 0;
		sum = 0;
		hasClicked = [0, 0, 0, 0, 0];
		$("#info-bar").css("background", "#7E7E7E");
		$("#info-bar").empty();
	});

	function clickLittleCircus(i, callback) {
		setTimeout(function() {
			if (hasClicked[i] == 0) {
				for (var j = 0; j < 5; j++) {
					if (j != i)
						littleCircus[j].style.background = "grey";
				}
				ajax(function(num) {
					hasClicked[i] = parseInt(num);
					sum += parseInt(num);
					console.log(sum);
					redCircus[i].innerHTML = parseInt(num);
					redCircus[i].style.opacity = 1;
					littleCircus[i].style.background = "grey"; //change the background
					for (var k = 0; k < 5; k++) {
						if (hasClicked[k] == 0)
							littleCircus[k].style.background = "blue";
					}
					count++;
				}, "../server");
				if (typeof callback === 'function') {
					callback();
				}
				if (count == 5)
					$("#info-bar").css("background", "blue");
			}
		}, Math.random * 1000);
	}	

	function sumCount() {
		if (count == 5) {
			$("#info-bar").append("<span>" + sum + "</span>");
			$("#info-bar").css("background", "grey");
			littleCircus.css("background", "blue");
			count = 0;
		}
	}

	function ajax(fnSuccess, url) {
		if (window.XMLHttpRequest) {
			var iAjax = new XMLHttpRequest();
		} else {
			var iAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (url.indexOf('?') != -1) {
            url += "&randnum=" + Math.random(); 
        } else {
            url += "?randnum=" + Math.random(); 
        }
		iAjax.open('GET', url, true);
		iAjax.send();
		iAjax.onreadystatechange = function() {
			if (iAjax.readyState == 4) {
				if (iAjax.status == 200)
					fnSuccess(iAjax.responseText);
			}
		}
	}

	$("#button").click(function() {
		clickLittleCircus(0, function(err) {
			clickLittleCircus(1, function(err) {
				clickLittleCircus(2, function(err) {
					clickLittleCircus(3, function(err) {
						clickLittleCircus(4, function(err) {
							setTimeout(sumCount, 3000);
						});
					});
				});
			});
		});
	});
});

