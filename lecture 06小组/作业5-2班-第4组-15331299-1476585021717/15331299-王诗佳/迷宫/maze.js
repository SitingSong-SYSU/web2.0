window.onload = function() {
	var start = false;
	var lose = false;
	var cheat = false;
	var se = document.getElementById("button").getElementsByTagName("div");
	var w = document.getElementById("game").getElementsByClassName("wall");
	var text = document.getElementById("hide");
	var game = document.getElementById("game");
	se[0].onmouseover = function() {
		start = true;
		lose = false;
		cheat = false;
		text.style.opacity = "0";
	};
	se[1].onmouseover = function() {
		if (start&&(!lose)&&(!cheat)) {
			text.innerHTML = "You Win";
			start = false;
			text.style.opacity = "1";
		} else if (start&&cheat&&(!lose)) {
			text.innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
			text.style.opacity = "1";
			start = false;
		}
	};
	game.onmouseleave = function() {
		if (start) {
			cheat = true;
		}
	};
	for (var i = 0; i < 9; i++) {
		w[i].onmouseover = function() {
			if (start&&(!lose)) {
				this.style.backgroundColor = "red";
				lose = true;
				text.innerHTML = "You Lose";
				text.style.opacity = "1";
			}
		};
		w[i].onmouseout = function() {
			if (start) {
				this.style.backgroundColor = "#E0E0E0";
			}
		};
	}
};
