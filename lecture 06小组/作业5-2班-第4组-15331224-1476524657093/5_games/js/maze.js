function addClass(ele, class_name) {
  if (!hasClass(ele, class_name))
    ele.className += " " + class_name;
}

function removeClass(ele, class_name) {
  if (!hasClass(ele, class_name)) return;
  var start = ele.className.indexOf(class_name);
  var end = start + class_name.length;
  ele.className = ele.className.substring(0, start - 1) + ele.className.substring(end);
}

function hasClass(ele, class_name) {
  return ele.className.indexOf(class_name) != -1;
}

window.onload = (function () {
  var Game = {
    "status" : "idle"
  };

  Game.resetWalls = function () {
    for (var index = 0; index < walls.length; ++index) {
      removeClass(walls[index], 'wall-error');
    }
  };

  Game.resetStatus = function () {
    Game.status = 'start';
  }

  Game.reset = function () {
    this.resetWalls();
    this.resetStatus();
  }

  var game_tip = document.getElementsByClassName('game-tip')[0];
  var start_mark = document.getElementsByClassName('start')[0];
  var end_mark = document.getElementsByClassName('end')[0];
  var walls = document.getElementsByClassName('wall');

  function changeGameTip(tip) {
    if (hasClass(game_tip, 'hidden')) {
      if (tip != '') {
        game_tip.textContent = tip;
        removeClass(game_tip, 'hidden');
      }
    } else {
      addClass(game_tip, 'hidden');
      if (tip != '') {
        setTimeout(function () {
          game_tip.textContent = tip;
          removeClass(game_tip, 'hidden');
        }, 500);
      }
    }
  }

  start_mark.addEventListener('mouseover', function (event) {
    Game.reset();
    changeGameTip('');
  });

  end_mark.addEventListener('mouseover', function checkWin(event) {
    if (Game.status == 'start') {
      changeGameTip('You Win!');
      Game.status = 'win';
    } else if (Game.status == 'out') {
      changeGameTip("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
    } else if (Game.status == 'fail') {
      changeGameTip("You Lose. Please restart from the start point.");
    }
  });

  for (var index = 0; index < walls.length; ++index) {
    if (hasClass(walls[index], 'wall-sample')) continue;
    walls[index].addEventListener('mouseover', function (event) {
      if (Game.status == 'start') {
        addClass(event.target, 'wall-error');
        Game.status = 'fail';
        changeGameTip("You Lose.");
      }
    });
    /*walls[index].addEventListener('mouseout', function (event) {
      removeClass(event.target, 'wall-error');
    });*/
  }

  var maze = document.getElementsByClassName('maze')[0];
  maze.addEventListener('mouseleave', function(event) {
    Game.status = 'out';
    changeGameTip("You're now out of the maze.");
    Game.resetWalls();
  });

});
