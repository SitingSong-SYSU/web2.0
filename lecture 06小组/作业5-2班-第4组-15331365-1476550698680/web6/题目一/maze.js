window.onload = function() {
	var result = document.getElementById("result");
	var Start = document.getElementById("Start");
	var End = document.getElementById("End");
	var wall = document.getElementsByClassName("wall");
	var main = document.getElementById("main");
	var win = 0;
	var cheat = 0;
	var begin = 0;

	Start.onmouseover = function() {  /*移到S时开始游戏*/
		result.innerHTML = "GO!";
		cheat = 0;
		begin = 1;
		win = 1;
	};

	main.onmouseleave = function() {
		cheat = 1;
	};

	for (var i = 0; i < wall.length; ++i) {
		wall[i].onmouseover = Hitwall;
	}
	function Hitwall() {   /*撞上墙*/
		if (begin === 1) {
			result.innerHTML = "You lose";
			this.className = 'hitWall';
			win = 0;
			begin = 0;
		}
	}
	for (var j = 0; j < wall.length; ++j) {
		wall[j].onmouseleave = function() {
			this.className = 'wall';
		};
	}

	End.onmouseover = function() {   /*移到E时结束游戏*/
		if (win === 1 && cheat === 0 && begin === 1) {
			result.innerHTML = "You win!";
		}
		if (cheat === 1 && begin === 1) {
			result.innerHTML = "Don't cheat,you should start from the 'S' and move to the 'E' inside th maze!";
		}
		begin = 0;
	};
	result.innerHTML = "";
};