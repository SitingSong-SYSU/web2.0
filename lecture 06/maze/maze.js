var flag = 0;
var changeWall = "";

window.onload = function main () {
	document.getElementById("start").onmouseover = function() {begin();}
	document.getElementById("end").onmouseover = function() {end();}
	document.getElementById("up-middle").onmouseover = function() {failed("up-middle");}
	document.getElementById("mid-left").onmouseover = function() {failed("mid-left");}
	document.getElementById("mid-middle").onmouseover = function() {failed("mid-middle");}
	document.getElementById("mid-right").onmouseover = function() {failed("mid-right");}
	document.getElementById("down-left").onmouseover = function() {failed("down-left");}
	document.getElementById("down-right").onmouseover = function() {failed("down-right");}
	document.getElementById("maze").onmouseleave = function() {cheat()};
}

function begin() {
	flag = 1;
	changeWall = "";
	document.getElementById("msg").textContent = "";
}

function failed(wall) {
	if (flag == 1) {
		flag = 0;
		changeWall = wall;
		document.getElementById(wall).className = "changed";
		document.getElementById("msg").textContent = "You Lose";
	}
}

function end() {
	if (flag == 1) {
		document.getElementById("msg").textContent = "You Win";
	} else {
		document.getElementById("msg").textContent = "Don't cheat, you should start start from the \'S\' and move to the \'E\' inside the maze!";
	}
}

function cheat() {
	if (flag == 1)
		flag = 0;
	if (flag == 0 || changeWall != "")
		document.getElementById(changeWall).className = "wall";
}