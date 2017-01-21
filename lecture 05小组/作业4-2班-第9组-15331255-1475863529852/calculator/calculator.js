var show = "";
var output = "";

function inherit() {
	if (output != "") {
		show = output;
		document.getElementById("output").value = "";
	}
}

window.onload = function() {
	document.getElementById("number0").onclick = function() {
		show += "0";
		document.getElementById("show").value = show;
	}
	document.getElementById("number1").onclick = function() {
		show += "1";
		document.getElementById("show").value = show;
	}
	document.getElementById("number2").onclick = function() {
		show += "2";
		document.getElementById("show").value = show;
	}
	document.getElementById("number3").onclick = function() {
		show += "3";
		document.getElementById("show").value = show;
	}
	document.getElementById("number4").onclick = function() {
		show += "4";
		document.getElementById("show").value = show;
	}
	document.getElementById("number5").onclick = function() {
		show += "5";
		document.getElementById("show").value = show;
	}
	document.getElementById("number6").onclick = function() {
		show += "6";
		document.getElementById("show").value = show;
	}
	document.getElementById("number7").onclick = function() {
		show += "7";
		document.getElementById("show").value = show;
	}
	document.getElementById("number8").onclick = function() {
		show += "8";
		document.getElementById("show").value = show;
	}
	document.getElementById("number9").onclick = function() {
		show += "9";
		document.getElementById("show").value = show;
	}
	document.getElementById("divide").onclick = function() {
		inherit();
		show += "/";
		document.getElementById("show").value = show;
	}

	document.getElementById("multiply").onclick = function() {
		inherit();
		show += "*";
		document.getElementById("show").value = show;
	}

	document.getElementById("minus").onclick = function() {
		inherit();
		show += "-";
		document.getElementById("show").value = show;
	}

	document.getElementById("plus").onclick = function() {
		inherit();
		show += "+";
		document.getElementById("show").value = show;
	}

	document.getElementById("left").onclick = function() {
		show += "(";
		document.getElementById("show").value = show;
	}

	document.getElementById("right").onclick = function() {
		show += ")";
		document.getElementById("show").value = show;
	}

	document.getElementById("equal").onclick = function() {
		var left = 0;
		var right = 0;
		if (show[0] == '+' || show[0] == '-' || show[0] == '*' || show[0] == '/' || show[0] == '.' || show[0] == ')') {
			alert("error!");
		}
		if (show[show.length-1] == '+' || show[show.length-1] == '-' || show[show.length-1] == '*' || show[show.length-1] == '/' || show[show.length-1] == '.' || show[show.length-1] == '(') {
			alert("error!");
		}
		for (var i = 0; i < show.length - 1; i++) {
			if ((show[i] == '+' || show[i] == '-' || show[i] == '*' || show[i] == '/' || show[i] == '.' ) && (show[i+1] == '+' || show[i+1] == '-' || show[i+1] == '*' || show[i+1] == '/' || show[i+1] == '.' )) {
				alert("error!");
			}
			if (show[i] == '(') {
				if (show[i+1] == '+' || show[i+1] == '-' || show[i+1] == '*' || show[i+1] == '/' || show[i+1] == '.' || show[i+1] == ')') {
					alert("error!");
				}
				left++;
			}
			if (show[i] == ')') {
				if (left <= right) {
					alert("error!");
				}
				if (show[i-1] == '+' || show[i-1] == '-' || show[i-1] == '*' || show[i-1] == '/' || show[i-1] == '.' || show[i-1] == ')') {
					alert("error!");
				}
				right++;
			}
		}
		if (left != right) {
			alert("error!");
		}

		if (show == "") {
			alert("please input something!");
		} else {
		eval("output = "+show);
		document.getElementById("output").value = "="+output;
		document.getElementById("show").value = "="+show;
	}
	}

	document.getElementById("delete").onclick = function() {
		show = show.substring(0, show.length - 1);
		document.getElementById("show").value = show;
	}

	document.getElementById("clear").onclick = function() {
		show = "";
		output = "";
		document.getElementById("show").value = show;
		document.getElementById("output").value = output;
	}

	document.getElementById("point").onclick = function() {
		show += ".";
		document.getElementById("show").value = show;
	}
}