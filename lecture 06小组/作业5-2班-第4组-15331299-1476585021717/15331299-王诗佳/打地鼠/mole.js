window.onload = function() {
	var s = 0;
	var start = false;
	var pause = false;
	var time = document.getElementById("time");
	var score = document.getElementById("score");
	var frag = document.createDocumentFragment();
	var b = document.getElementById("startstop");
	var moni = document.getElementById("moni");
	moni.value = " ";
	score.value = 0;
	time.value = 0;
	var game = document.getElementById("gameplace");
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 10; j++) {
			var hole = document.createElement("button");
			frag.appendChild(hole);
		}
		if (i!=5){
			var newline = document.createElement("br");
			frag.appendChild(newline);
		}
	}
	game.appendChild(frag);
	var pos = document.getElementById("gameplace").getElementsByTagName("button");
	function playing() {
		if (start) {
			var num = Math.random()*60;
			for(var i=0;i<=60;i++){
				if(num<i){
					num=i-1;
					break;
				}
			}
			pos[num].style.backgroundColor = "#3366FF";
			for (i = 0; i < 60; i++) {
				if (i != num) {
					pos[i].onclick = function() {
						s--;
						score.value = s;
					};
				}
			}
			pos[num].onclick = function() {
				s++;
				score.value = s;
				pos[num].style.backgroundColor = "white";
				playing();
				return;
			};
		}
	}
	function Count(t){
		time.value=t;
		if(t >= 0&&start){
			setTimeout(function(){
				Count(t);
			},1000);
		}
		if(t == -1){
			start = false;
			time.value=0;
			GameOver();
		}
		t--;
	}
	function GameOver() {
		moni.value="Game Over";
		for (var i = 0; i < 60; i++) {
			pos[i].style.backgroundColor = "white";
		}
		alert("Game over:\nYour score is:"+score.value);
	}
	b.onclick = function() {
		if (!start) {
			start = true;
			s = 0;
			pause = false;
			moni.value = "Playing";
			Count(30);
			playing();
		} else {
			pause = true;
			start = false;
			GameOver();
		}
	};
};