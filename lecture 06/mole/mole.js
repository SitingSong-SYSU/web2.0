var gameTime = 0;        //倒计时
var timeId = null;        //指定setTimeout()的变量
var playing = false;      //游戏是否开始
var score = 0;            //分数
var ran = 0;              //亮起的mole号码
var point = document.getElementsByName("aMole");

window.onload = function main () {
	document.getElementById("start-mole").onclick = function() {satrtGame();}
	for (var i = 0; i < point.length; i++) {
		point[i].onclick = function() {changeMole(this.id);}
	};
}

function satrtGame() {
	if (!playing) {
		gameTime = 30;
		score = 0;
		playing = true;
		document.getElementById("status").value = "Playing";
		timeShow();
		moleShow();
	} else {
		GameOver();
	}
}

function timeShow() { //显示当前倒计时所剩时间
    document.getElementById("time-count").value = gameTime;
    if(gameTime == 0) {
        GameOver();
        return;
    } else {
        gameTime = gameTime - 1;
        timeId = setTimeout("timeShow()",1000);
    }
}

function GameOver() {
    clearTimeout(timeId); //clearTime()方法返回setTimeout()的id
    playing = false;
    gameTime = 0;
    document.getElementById("time-count").value = gameTime;
    point[ran].checked = false;
    document.getElementById("status").value = "Game Over";
    alert("Game Over.\nYour score is: "+score);
}

function moleShow() {
	ran = parseInt(60 * Math.random());
	point[ran].checked = true;
}

function changeMole(id) {
	if (!playing) {
		alert("请点击开始游戏");
		document.getElementById(id).checked = false;
	} else {
		if (point[ran].checked == true) {
			score++;
			document.getElementById("score").value = score;
			document.getElementById(id).checked = false;
			ran = parseInt(60 * Math.random());
			point[ran].checked = true;
		} else {
			score--;
			document.getElementById("score").value = score;
			document.getElementById(id).checked = false;
			point[ran].checked = true;
		}
	}
		
}
