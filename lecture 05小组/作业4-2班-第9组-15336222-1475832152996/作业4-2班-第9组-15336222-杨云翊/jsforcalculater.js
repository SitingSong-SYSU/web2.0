
function loadstring(text) {
	var x = text.innerHTML;
	document.getElementById("inputc").value += x;
}

function wipeone() {
	var text = document.getElementById("inputc").value; 
	document.getElementById("inputc").value = text.substring(0,text.length-1);
}

function clearall() {
	document.getElementById("inputc").value = "";
}

function calculate() {
	var text = document.getElementById("inputc").value;
	try{
		var result = eval(text);
		document.getElementById("inputc").value = result;
	}
	catch(error) {
		window.alert("invalid input");
		clearall();
	}
}