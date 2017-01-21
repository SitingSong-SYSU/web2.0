window.onload = function () {
  var radio_div = document.getElementsByClassName('radio-div')[0];
  var moles = [];
  var hud_game_btn = document.getElementsByClassName('hud-game-btn')[0];
  var hud_status = document.getElementsByClassName('hud-status')[0];
  var hud_time = document.getElementsByClassName('hud-time-display')[0];
  var hud_score = document.getElementsByClassName('hud-score-display')[0];

  var Game = {
    "time": 0,
    "score": 0,
    "status": "over",  /* over/playing */
    "now_radio_index": -1,
    "timer": 0,
    "addScore" : function () {
      this.score++;
      hud_score.value = String(this.score);
    },
    "subScore" : function () {
      this.score--;
      hud_score.value = String(this.score);
    },
    "stop" : function () {
      clearInterval(this.timer);
      alert('Game Over.\nYour score is: ' + String(this.score));
      this.status = 'over';
      hud_status.value = 'Game Over';
    },
    "start" : function (total_time) {
      for (var i = 0; i < moles.length; ++i) {
        moles[i].checked = false;
      }
      this.time = total_time;
      this.score = 0;
      this.status = 'playing';
      this.generateMole();
      this.timer = setInterval(function() {
        if (Game.time > 0) {
          Game.gameLoop();
        } else {
          Game.stop();
        }
      }, 1000);
      hud_status.value = 'Playing';
    },
    "subTime" : function () {
      --this.time;
      hud_time.value = String(this.time);
    },
    "gameLoop" : function () {
      this.subTime();
    },
    "generateMole": function () {
      var rnd = parseInt(Math.random()*60);
      this.now_radio_index = rnd;
      moles[this.now_radio_index].checked = true;
    }
  };

  function changeGameStatus(game_status) {
    hud_status.value = game_status;
  }

  // initialize radios
  var new_span = null;
  for (var i = 0; i < 60; ++i) {
    var radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('class', 'mole');
    radio.gameid = i;
    if (i % 10 == 0) {
      new_span = document.createElement('div');
      radio_div.appendChild(new_span);
    }
    new_span.appendChild(radio);
    moles.push(radio);
  }

  // initialize HUD
  changeGameStatus('');
  hud_time.value = '0';
  hud_score.value = '0';

  // bind click event to moles
  for (var i = 0; i < moles.length; ++i) {
    moles[i].addEventListener('click', function (event) {
      event.target.checked = false;
      if (Game.status == 'playing') {
        if (event.target.gameid == Game.now_radio_index) {
          Game.addScore();
          Game.generateMole();
        } else {
          Game.subScore();
        }
      }
    });
  }

  // bind click event to Start/Stop Game
  hud_game_btn.addEventListener('click', function (event) {
    if (Game.status == 'playing') {
      Game.stop();
    } else if (Game.status == 'over') {
      var res = prompt("Please input how much time you want to play? (input seconds)");
      while (isNaN(parseInt(res))) {
        res = prompt("Please do input an integer.");
      }
      Game.start(parseInt(res));
    }
  });
}
