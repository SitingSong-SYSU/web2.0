var maze = (function() {
	var flag = 0;
	var changeWall = "";
	
	function begin() {
		flag = 1;
		$("#" + changeWall).attr("class", "wall");
		changeWall = "";
		$("#msg").text(" ");
	}

	function failed(wall) {
		if (flag == 1) {
			flag = 0;
			changeWall = wall;
			$("#" + wall).attr("class", "changed");
			$("#msg").text("You Lose");
		}
	}

	function end() {
		if (flag == 1)
			$("#msg").text("You Win");
		else
			$("#msg").text("Don't cheat, you should start start from the \'S\' and move to the \'E\' inside the maze!");
	}

	function cheat() {
		if (flag == 1)
			flag = 0;
		if (flag == 0 || changeWall != "")
			$("#" + changeWall).attr("class", "wall");
	}

	return {
		begin: begin,
		end: end,
		failed: failed,
		cheat: cheat
	}
})();

$(function() {
	$("#start").mouseover(function() {maze.begin();});
	$("#end").mouseover(function() {maze.end();});
	$("#up-middle").mouseover(function() {maze.failed("up-middle");});
	$("#mid-left").mouseover(function() {maze.failed("mid-left");});
	$("#mid-middle").mouseover(function() {maze.failed("mid-middle");});
	$("#mid-right").mouseover(function() {maze.failed("mid-right");});
	$("#down-left").mouseover(function() {maze.failed("down-left");});
	$("#down-right").mouseover(function() {maze.failed("down-right");});
	$("#maze").mouseleave(function() {maze.cheat();});
});
