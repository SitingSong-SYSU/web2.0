var gameTime = 0;        //倒计时
var timeId = null;        //指定setTimeout()的变量
var playing = false;      //游戏是否开始
var score = 0;            //分数
var ran = 0;              //亮起的mole号码
var point = $("#mole").children();

function satrtGame() {
	if (!playing) {
		gameTime = 30;
		score = 0;
		playing = true;
		$("#score").attr("value", score);
		$("#status").attr("value", "Playing");
		timeShow();
		moleShow();
	} else {
		GameOver();
	}
}

function timeShow() { //显示当前倒计时所剩时间
    $("#time-count").attr("value", gameTime);
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
    $("#time-count").attr("value", gameTime);
    point[ran].checked = false;
    $("#status").attr("value", "Game Over");
    alert("Game Over.\nYour score is: "+ score);
}

function moleShow() {
	ran = parseInt(60 * Math.random());
	point[ran].checked = true;
}

function changeMole(that) {
	if (!playing) {
		alert("请点击开始游戏");
		that.checked = false;
	} else {
		if (point[ran].checked == true) {
			score++;
			$("#score").attr("value",score);
			that.checked = false;
			ran = parseInt(60 * Math.random());
			point[ran].checked = true;
		} else {
			score--;
			$("#score").attr("value", score);
			that.checked = false;
			point[ran].checked = true;
		}
	}
};

$(function() {
	$("#start-mole").click(function() {satrtGame();});
	$("#mole").children().click(function() {changeMole(this);});
});