window.onload = function() {
	document.getElementById('zero').onclick = function() {
		numButton('0');
	}
	document.getElementById('one').onclick = function() {
		numButton('1');
	}
	document.getElementById('two').onclick = function() {
		numButton('2');
	}
	document.getElementById('three').onclick = function() {
		numButton('3');
	}
	document.getElementById('four').onclick = function() {
		numButton('4');
	}
	document.getElementById('five').onclick = function() {
		numButton('5');
	}
	document.getElementById('six').onclick = function() {
		numButton('6');
	}
	document.getElementById('seven').onclick = function() {
		numButton('7');
	}
	document.getElementById('eight').onclick = function() {
		numButton('8');
	}
	document.getElementById('nine').onclick = function() {
		numButton('9');
	}
	document.getElementById('add').onclick = function() {
		numButton('+');
	}
	document.getElementById('reduce').onclick = function() {
		numButton('-');
	}
	document.getElementById('multiply').onclick = function() {
		numButton('*');
	}
	document.getElementById('divide').onclick = function() {
		numButton('/');
	}
	document.getElementById('point').onclick = function() {
		numButton('.');
	}
	document.getElementById('LB').onclick = function() {
		numButton('(');
	}
	document.getElementById('RB').onclick = function() {
		numButton(')');
	}
	document.getElementById('delete').onclick = function() {
		deleteButton();
	}
	document.getElementById('CE').onclick = function() {
		clearButton();
	}
	document.getElementById('equal').onclick = function() {
		equalButton();
	}
}

function numButton(id) {
	document.getElementById('s1').value += id;
}

function deleteButton() {
	var str = document.getElementById('s1');
	str.value = str.value.substring(0, str.value.length - 1);
}

function clearButton() {
	document.getElementById('s1').value = "";
}

function equalButton() {
	try {
		var s = eval(document.getElementById('s1').value);
		if (s == 'Infinity' || s == 'underfine'|| s == 'NaN') throw s;
		document.getElementById('s1').value = s;
	} catch(exception) {
		alert(exception);
	}
}