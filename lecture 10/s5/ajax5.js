$(function() {
    var littleCircus = $(".button"),
        redCircus = $(".unread"),
        message = document.getElementById("message");

    $("#apb").click(function() {
        var arr = [0, 1, 2, 3 ,4];
        $('#bubble-order').empty();
        message.innerHTML = "";
        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        for (var i = 0; i < 5; i++)
            $('#bubble-order').append(String.fromCharCode(arr[i] + 65));
        clickNextBotton(0, 0, arr);
    });

    $("#button").mouseleave(function() {
        for (var i = 0; i < 5; i++) {
            littleCircus[i].style.background = "blue";
            redCircus[i].style.opacity = 0;
            redCircus[i].innerHTML = "";
        }
        $("#info-bar").css("background", "#7E7E7E");
        $("#info-bar").empty();
        $('#bubble-order').empty();
        message.innerHTML = "";
    });

    function clickNextBotton(currentSum, index, order) {
        console.log(currentSum);
        if (index == 5) {
            bubbleHandler(currentSum);
            return;
        }
        switch (order[index]) {
            case 0:
                aHandler(currentSum, index, order, function(err, nextIndex, sum) {
                    if (err) {
                        message.innerHTML = err;
                        setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                    } else {
                        clickNextBotton(sum, nextIndex, order);
                    }
                });
                break;

            case 1:
                bHandler(currentSum, index, order, function(err, nextIndex, sum) {
                    if (err) {
                        message.innerHTML = err;
                        setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                    } else {
                        clickNextBotton(sum, nextIndex, order);
                    }
                });
                break;

            case 2:
                cHandler(currentSum, index, order, function(err, nextIndex, sum) {
                    if (err) {
                        message.innerHTML = err;
                        setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                    } else {
                        clickNextBotton(sum, nextIndex, order);
                    }
                });
                break;

            case 3:
                dHandler(currentSum, index, order, function(err, nextIndex, sum) {
                    if (err) {
                        message.innerHTML = err;
                        setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                    } else {
                        clickNextBotton(sum, nextIndex, order);
                    }
                });
                break;

            case 4:
                eHandler(currentSum, index, order, function(err, nextIndex, sum) {
                    if (err) {
                        message.innerHTML = err;
                        setTimeout(clickNextBotton, 1000, sum, nextIndex, order);
                    } else {
                        clickNextBotton(sum, nextIndex, order);
                    }
                });
                break;
        }
    }

    function bubbleHandler(currentSum) {
        message.innerHTML = '楼主异步调用战斗力感人，目测不超过' + currentSum;
        $('#info-bar').append("<span>" + currentSum + "</span>");
        $("#info-bar").css("background", "grey");
        littleCircus.css("background", "blue");
    }

    function aHandler(currentSum, index, order, callback) {
        littleCircus[0].childNodes[1].style.opacity = 1;
        littleCircus[0].childNodes[1].innerHTML = "...";
        if (failedToHandle()) {
            callback('太阳底下没有新鲜事', index, currentSum);
        } else {
            message.innerHTML = '这是个天大的秘密';
            ajax(function(number) {
                littleCircus[0].childNodes[1].innerHTML = number;
                littleCircus[0].style.background = "grey";
                littleCircus[0].disabled = 1;
                callback(null, index + 1, parseInt(number) + parseInt(currentSum));
            });
        }
    }

    function bHandler(currentSum, index, order, callback) {
        var littleCircus = $('.button');
        littleCircus[1].childNodes[1].style.opacity = 1;
        littleCircus[1].childNodes[1].innerHTML = "...";
        if (failedToHandle()) {
            callback('我知道', index, currentSum);
        } else {
            message.innerHTML = '我不知道';
            ajax(function(number) {
                littleCircus[1].childNodes[1].innerHTML = number;
                littleCircus[1].style.background = "grey";
                littleCircus[1].disabled = 1;
                callback(null, index + 1, parseInt(number) + parseInt(currentSum));
            });
        }
    }

    function cHandler(currentSum, index, order, callback) {
        var littleCircus = $('.button');
        littleCircus[2].childNodes[1].style.opacity = 1;
        littleCircus[2].childNodes[1].innerHTML = "...";
        if (failedToHandle()) {
            callback('你知道', index, currentSum);
        } else {
            message.innerHTML = '你不知道';
            ajax(function(number) {
                littleCircus[2].childNodes[1].innerHTML = number;
                littleCircus[2].style.background = "grey";
                littleCircus[2].disabled = 1;
                callback(null, index + 1, parseInt(number) + parseInt(currentSum));
            });
        }
    }

    function dHandler(currentSum, index, order, callback) {
        var littleCircus = $('.button');
        littleCircus[3].childNodes[1].style.opacity = 1;
        littleCircus[3].childNodes[1].innerHTML = "...";
        if (failedToHandle()) {
            callback('他知道', index, currentSum);
        } else {
            message.innerHTML = '他不知道';
            ajax(function(number) {
                littleCircus[3].childNodes[1].innerHTML = number;
                littleCircus[3].style.background = "grey";
                littleCircus[3].disabled = 1;
                callback(null, index + 1, parseInt(number) + parseInt(currentSum));
            });
        }
    }

    function eHandler(currentSum, index, order, callback) {
        var littleCircus = $('.button');
        littleCircus[4].childNodes[1].style.opacity = 1;
        littleCircus[4].childNodes[1].innerHTML = "...";
        if (failedToHandle()) {
            callback('才是', index, currentSum);
        } else {
            message.innerHTML = '才怪';
            ajax(function(number) {
                littleCircus[4].childNodes[1].innerHTML = number;
                littleCircus[4].style.background = "grey";
                littleCircus[4].disabled = 1;
                callback(null, index + 1, parseInt(number) + parseInt(currentSum));
            });
        }
    }

    function failedToHandle() {
        return Math.random() > 0.5;
    }

    function ajax(fnSuccess, url) {
        if (window.XMLHttpRequest) {
            var iAjax = new XMLHttpRequest();
        } else {
            var iAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        iAjax.open('GET', url, true);
        iAjax.send();
        iAjax.onreadystatechange = function() {
            if (iAjax.readyState == 4) {
                if (iAjax.status == 200)
                    fnSuccess(iAjax.responseText);
            }
        }
    }
});
