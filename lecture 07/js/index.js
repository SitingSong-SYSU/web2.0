var game = {
    timer: null,
    isCheating: false,
    size: 16,
    path: [],
    pathIndex: 0,
    imgArray: [],
    playing: false,
    desNode: new NPuzzleNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4),
    curNode: new NPuzzleNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4)
};

function getId(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
}

window.onload = function main () {
    reload();
    getId("restart").onclick = function() {makeGame();};
    getId("cheatBtn").onclick = function() {cheat();};
};

function reload() {
    var canvas = getId('gameCanvas');
    //清空gameCanvas
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    // 文档碎片
    var oFragment = document.createDocumentFragment();
    //循环生成方块状态的小图，以背景的形式展现，生成16格,并添加到数组
    for (var i = 0; i < 16; i++) {
        var li = document.createElement('li');
        li.id = i + 1;
        if (i == 15) li.id = 0;
        li.className = 'background-img' + i;
        li.className += ' row' + parseInt(i / 4);
        li.className += ' col' + parseInt(i % 4);
        game.imgArray.push(li);
        oFragment.appendChild(li);
    }
    canvas.appendChild(oFragment);
}

function makeGame() {
    game.playing = true;
    if (!succeedGame()) {
        getId('0').className = 'background-img' + 15 + ' row' + 3 + ' col' + 3;
        for (var i = 1; i < 16; i++) {
            getId(i).className = 'background-img' + (i - 1) + ' row' + parseInt((i - 1) / 4) + ' col' + parseInt((i - 1) % 4);
        }
    }
    //steps = []; //清空数组
    mazeBlock();
    if (game.imgArray[15].id !== 0) checkMaze();
    for (var ii = 0; ii < 16; ii++) {
        game.imgArray[ii].onclick = function() {
            moveBlock(this.id);
        };
    }
}

function moveBlock(id) {
    if (game.playing) {
        var blankBlock,
            thisBlock;
        for (var i = 0; i < 16; i++) {
            if (game.imgArray[i].id == id) thisBlock = i;
            if (game.imgArray[i].id == 0) blankBlock = i;
        }
        if ((Math.abs(thisBlock - blankBlock) == 1 && parseInt(blankBlock / 4) == parseInt(thisBlock / 4))
            || (Math.abs(thisBlock - blankBlock) == 4 && parseInt(blankBlock % 4) == parseInt(thisBlock % 4))) {
            game.imgArray[thisBlock].className = 'background-img' + (id - 1) + ' row' + parseInt(blankBlock / 4) + ' col' + parseInt(blankBlock % 4);
            game.imgArray[blankBlock].className = 'background-img' + 15 + ' row' + parseInt(thisBlock / 4) + ' col' + parseInt(thisBlock % 4);
            var temp = game.imgArray[thisBlock];
            game.imgArray[thisBlock] = game.imgArray[blankBlock];
            game.imgArray[blankBlock] = temp;
        }
        if (succeedGame()) {
            alert("You Win!");
            game.playing = false;
        }
    }
}

function mazeBlock() {
    var blankBlock,
        thisBlock;
    for (var j = 0; j < 1000; j++) {
        for (var i = 0; i < 16; i++) {
            if (game.imgArray[i].id == 0) blankBlock = i;
        }
        thisBlock = parseInt(16 * Math.random());
        if (//thisBlock != steps[steps.length - 1] &&
                ((Math.abs(thisBlock - blankBlock) == 1 && parseInt(blankBlock / 4) == parseInt(thisBlock / 4))
                || (Math.abs(thisBlock - blankBlock) == 4 && parseInt(blankBlock % 4) == parseInt(thisBlock % 4)))) {
            //steps.push(blankBlock);
            game.imgArray[thisBlock].className = 'background-img' + (game.imgArray[thisBlock].id - 1) + ' row' + parseInt(blankBlock / 4) + ' col' + parseInt(blankBlock % 4);
            game.imgArray[blankBlock].className = 'background-img' + 15 + ' row' + parseInt(thisBlock / 4) + ' col' + parseInt(thisBlock % 4);
            var temp = game.imgArray[thisBlock];
            game.imgArray[thisBlock] = game.imgArray[blankBlock];
            game.imgArray[blankBlock] = temp;
        }
    }
}

function checkMaze() { //保证空白格在右下
    var blankBlock,
        thisBlock;
    for (var j = 0; j < 16; j++) {
        for (var i = 0; i < 16; i++) {
            if (game.imgArray[i].id == 0) blankBlock = i;
        }
        thisBlock = j;
        if ((Math.abs(thisBlock - blankBlock) == 1 && parseInt(blankBlock / 4) == parseInt(thisBlock / 4))
                || (Math.abs(thisBlock - blankBlock) == 4 && parseInt(blankBlock % 4) == parseInt(thisBlock % 4))) {
            //steps.push(blankBlock);
            game.imgArray[thisBlock].className = 'background-img' + (game.imgArray[thisBlock].id - 1) + ' row' + parseInt(blankBlock / 4) + ' col' + parseInt(blankBlock % 4);
            game.imgArray[blankBlock].className = 'background-img' + 15 + ' row' + parseInt(thisBlock / 4) + ' col' + parseInt(thisBlock % 4);
            var temp = game.imgArray[thisBlock];
            game.imgArray[thisBlock] = game.imgArray[blankBlock];
            game.imgArray[blankBlock] = temp;
        }
    }
}

function succeedGame() {
    for (var i = 0; i < 16; i++) {
        if (game.imgArray[i].id != (i + 1) % 16) return false;
    }
    return true;
}

function cheat() {
    // Searching
    for (var i = 0; i < 16; i++) {
        game.curNode.val[i] = game.imgArray[i].id;
    }
    console.log("Searching...");
    var puzzle = new NPuzzle(game.curNode, game.desNode);
    puzzle.run();
    console.log("Searching finished.");
    console.log("Searched nodes: " + puzzle.searchedCnt);
    console.log("Path length: " + puzzle.pathDirec.length);
    // Recover the puzzle
    game.path = puzzle.pathDirec;
    game.pathIndex = 0;
    game.timer = setInterval(function() {
        if (game.pathIndex == game.path.length) {
            clearInterval(game.timer);
            game.path = [];
        } else {
            var blankBlock,
                thisBlock = game.path[++game.pathIndex];
            for (var i = 0; i < 16; i++) {
                if (game.imgArray[i].id == 0) blankBlock = i;
            }
            if (thisBlock == 1) thisBlock = blankBlock - 1;
            else if (thisBlock == 2) thisBlock = blankBlock - 4;
            else if (thisBlock == 3) thisBlock = blankBlock + 1;
            else if (thisBlock == 4) thisBlock = blankBlock + 4;
            moveBlock(game.imgArray[thisBlock].id);
        }
    }, 500);
}