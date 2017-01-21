window.onload = function() {
	var main = document.getElementById("main");
	var holes = [];
	var startStop = document.getElementById("startStop");
	var result = document.getElementById("result");

	var time = document.getElementById("time");
	var score = document.getElementById("score");
	var Time = 30;
	var Score = 0;
	var countTime;
	var begin = 0;
	result.innerHTML = "Not begin~";
	for (var i = 0; i < 42; ++i) {  /*生成地鼠洞*/
		holes.push(document.createElement("div"));
		holes[i].className = "hole";
		main.appendChild(holes[i]);
	}
	startStop.onclick = function() {   /*点击开始/停止按钮的事件*/
		if (begin === 0) {  /*开始游戏*/
			result.innerHTML = "Begin!";
			begin = 1;
			Time = 30;
			time.innerHTML = Time;
			var MOUSE2 = Math.floor(Math.random()*42); /*随机出现地鼠*/
			holes[MOUSE2].className = "mouse";
			countTime = setInterval(function() {  /*计时函数*/
				Time -= 1;
				time.innerHTML = Time;
				if (Time === -1) {
					clearInterval(countTime);
					alert("Times over! Your score is: "+Score);
					result.innerHTML = "Not begin~";
					time.innerHTML = 0;
					score.innerHTML = 0;
					Time = 0;
					Score = 0;
					begin = 0;
					for (var i = 0; i < 42; ++i) {
						holes[i].className = "hole";
					}
				}
			},1000);
		} else {  /*停止游戏*/
			clearInterval(countTime);
			result.innerHTML = "Not begin~";
			alert("Game over! Your score is: "+Score);
			time.innerHTML = 0;
			score.innerHTML = 0;
			Time = 0;
			Score = 0;
			begin = 0;
			for (var i = 0; i < 42; ++i) {
				holes[i].className = "hole";
			}
		}
	};
	for (var j = 0; j < holes.length; j++) {
		holes[j].onclick = hitMouse;
	}
	function hitMouse() {   /*敲击事件,如果打中地鼠则加分且随机生成另一只地鼠,如果打错则减分*/
		if (begin === 1) {
			if (this.className === "hole") {
				Score--;
			} else {
				Score++;
				this.className = "hole";
				var MOUSE1 = Math.floor(Math.random()*42);
				holes[MOUSE1].className = "mouse";
			}
			score.innerHTML = Score;
		}
	}
};
