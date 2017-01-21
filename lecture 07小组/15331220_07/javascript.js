var ifStart;
var currentBlankIndex = 16;
var formArray;
var flag = false;

//判断点击的pic附近有没有blank，有交换，没有不做操作，交换之后判断游戏是否结束
function check(event) {
    if (ifStart) {
        var currentPicture = event.target;
        var Blank = document.getElementById("blank");
        var currentPictureIndex = currentPicture.id.match(/\d/g).join("");
        var coordinateOfCurrentPicture = currentPicture.className.match(/\d/g);
        var coordinateOfBlank = Blank.className.match(/\d/g);
        if (Math.abs(coordinateOfCurrentPicture[0]-coordinateOfBlank[0])
            + Math.abs(coordinateOfCurrentPicture[1] - coordinateOfBlank[1]) == 1) {
            currentPicture.className = "picture" + " row" + coordinateOfBlank[0] + " col" + coordinateOfBlank[1];
            Blank.className = "blank" + " row" + coordinateOfCurrentPicture[0] + " col" + coordinateOfCurrentPicture[1];
            formArray[(parseInt(coordinateOfBlank[0]) - 1) * 4 + parseInt(coordinateOfBlank[1]) - 1] = parseInt(currentPictureIndex);
            formArray[(parseInt(coordinateOfCurrentPicture[0]) - 1) * 4 + parseInt(coordinateOfCurrentPicture[1]) - 1] = parseInt(currentBlankIndex);
        }
        ifEnd();
    }
    if (flag) {
        alert("厉害了word哥");
        flag = false;
    }
}

//生成拼图
function createForm() {
    var form = document.getElementById("form");
    for (var i = 0; i < 15; i++) {
        var Picture = document.createElement("div");
        Picture.className = "picture" + " row" + parseInt(i / 4 + 1) + " col" + parseInt(i % 4 + 1);
        Picture.id = "p" + (i + 1);
        Picture.addEventListener("click", check);
        form.appendChild(Picture);
    }
    var Blank = document.createElement("div");
    Blank.className = "blank row4 col4";
    Blank.id = "blank"
    form.appendChild(Blank);
}

function solveable() {
    var count = 0;
    for (var i = 0; i < 16; i++) {
        for (var j = i; j < 16; j++) {
            if (formArray[i] > formArray[j]) count++;
        }
    }
    if (count % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

//生成一个保证有解的打乱之后的拼图，用到了逆序对是否为偶数的原理
function createRandomForm() {
    init();
    ifStart = true;
    do {
        for (var i = 0, len = formArray.length; i < len; i++) {
            var rand = parseInt(Math.random() * len);
            var temp = formArray[rand];
            formArray[rand] = formArray[i];
            formArray[i] = temp;
        }
    } while (!solveable());
    for (var i = 0; i < 16; i++) {
        var currentBlock;
        if (formArray[i] == 16) {
            currentBlock = document.getElementById("blank");
            currentBlock.className = "blank" + " row" + parseInt(i / 4 + 1) + " col" + parseInt(i % 4 + 1);
        } else {
            currentBlock = document.getElementById("p" + parseInt(formArray[i]));
            currentBlock.className = "picture" + " row" + parseInt(i / 4 + 1) + " col" + parseInt(i % 4 + 1);
        }
    }
}

//添加图片，重置所有的标记变量
function init() {
    ifStart = false;
    formArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    var Button = document.getElementById("restart");
    Button.addEventListener("click", createRandomForm);
}

//判断拼图是否完成
function ifEnd() {
    for (var i = 0; i < 16; i++) {
        if (formArray[i] != i + 1) {
            return;
        }
    }
    flag = true;
}

window.onload = function() {
    createForm();
    init();
}