"use strict";
var gameFunction = {
    bestScoreStorage: function() {
        var bestScore = localStorage.getItem('colour_best_score');
        if (bestScore == null) {
            bestScore = 0;
            localStorage.setItem('colour_best_score', bestScore);
        } else {
            bestScore = localStorage.getItem('colour_best_score');
        }
        element.bestScoreValue.textContent = bestScore;
        return bestScore;
    },
    lostCountStorage: function() {
        var lostCount = localStorage.getItem('colour_lost_count');
        if (lostCount == null) {
            lostCount = 0;
            localStorage.setItem('colour_lost_count', lostCount);
        } else {
            lostCount = localStorage.getItem('colour_lost_count');
        }
        element.lostTimes.textContent = lostCount;
        gameFunction.lostGrammar();
        return lostCount;
    },
    lostGrammar: function() {
        var deadNum = parseInt(element.lostTimes.textContent);
        if (deadNum == 0) {
            element.deadGrammar.textContent = 'times!';
        } else if (deadNum == 1) {
            element.deadGrammar.textContent = 'time!';
        } else {
            element.deadGrammar.textContent = 'times!'
        }
        return;
    },
    muteStateStorage: function() {
        var muteState = localStorage.getItem('colour_mute_state');
        if (muteState == null) {
            muteState = 'false';
            localStorage.setItem('colour_mute_state', muteState);
        } else {
            muteState = localStorage.getItem('colour_mute_state');
        }
        gameFunction.muteState();
        return muteState;
    },
    muteState: function() {
        var muteState = localStorage.getItem('colour_mute_state');
        if (muteState == 'true') {
            soundeffect.select.muted = true;
            soundeffect.back.muted = true;
            soundeffect.rightansw.muted = true;
            soundeffect.wrongansw.muted = true;
            element.soundOn.style.display = 'none';
            element.soundOff.style.display = 'block';
        } else {
            soundeffect.select.muted = false;
            soundeffect.back.muted = false;
            soundeffect.rightansw.muted = false;
            soundeffect.wrongansw.muted = false;
            element.soundOn.style.display = 'block';
            element.soundOff.style.display = 'none';
        }
        return;
    },
    choicesRandom: function() {
        var beforeNames = names.length, afterNames, getRandomNames;
        var beforeColors = colors.length, afterColors, getRandomColors;
        while (0 != beforeNames && 0 != beforeColors) {
            getRandomNames = Math.floor(Math.random() * beforeNames);
            beforeNames -= 1;
            afterNames = names[beforeNames];
            names[beforeNames] = names[getRandomNames];
            names[getRandomNames] = afterNames;
            getRandomColors = getRandomNames;
            beforeColors -= 1;
            afterColors = colors[beforeColors];
            colors[beforeColors] = colors[getRandomColors];
            colors[getRandomColors] = afterColors;
        }
        return;
    },
    resetScore: function() {
        element.scoreValueContainer.textContent = 0;
        element.thisScore.textContent = 0;
    },
    difficulty: function() {
        var difficulty = sessionStorage.getItem('colour_this_difficulty');
        if (difficulty == null) {
            difficulty = 1500;
        } else {
            difficulty = sessionStorage.getItem('colour_this_difficulty') - 10;
        }
        sessionStorage.setItem('colour_this_difficulty', difficulty);
        return difficulty;
    },
    getRandom: function(min, max) {
        min = Math.ceil(0);
        max = Math.floor(4);
        var i = Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
        return i;
    },
    choose: function(array) {
        var chosen = array[gameFunction.getRandom()];
        return chosen;
    },
    displayColoredWord: function() {
        element.coloredWordContainer.textContent = gameFunction.choose(names);
        element.coloredWordContainer.style.color = gameFunction.choose(colors);
    },
    timeout: function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            gameFunction.gameOver();
        }, sessionStorage.getItem('colour_this_difficulty'));
    },
    timer: function() {
        clearInterval(timer);
        var w = 100
        timer = setInterval(function() {
            if (w > 1) {
                element.timer.style.width = ((w - 1) - 1) + '%';
                w--;
            } else {
                return;
            }
        }, (sessionStorage.getItem('colour_this_difficulty') / 100));
    },
    getChoices: function() {
        for (var i = 0; i < names.length; i++) {
            element.choicesContainer.innerHTML += '<li><p class="choice" data-colour="' + colors[i] + '">' + names[i] + '</p></li>';
        }
    },
    displayChoices: function() {
        var choices = document.querySelectorAll('.choice');
        return choices;
    },
    choiceListener: function() {
        for (var i = 0; i < names.length; i++) {
            gameFunction.displayChoices()[i].addEventListener('click', function(e) {
                gameFunction.choiceOverseer(e);
            });
        }
    },
    choiceOverseer: function(e) {
        var choice = e.target.getAttribute('data-colour');
        if (choice != element.coloredWordContainer.style.color) {
            gameFunction.gameOver();
        } else {
            gameFunction.difficulty();
            gameFunction.updateScore();
            gameFunction.displayColoredWord();
            gameFunction.timer();
            gameFunction.timeout();
            soundeffect.rightansw.play();
        }
    },
    gameOver: function() {
        if (element.gameoverContainer.style.display != 'block' && element.startBtn.style.display != 'block') {
            element.gameoverContainer.style.display = 'block';
            element.restartBtn.style.display = 'block';
            element.timerContainer.style.visibility = 'hidden';
            soundeffect.wrongansw.play();
            var lostTimes = parseInt(element.lostTimes.textContent);
            var lostCount = lostTimes + 1;
            localStorage.setItem('colour_lost_count', lostCount);
            gameFunction.lostCountStorage();
        } else {
            return;
        }
    },
    restart: function() {
        sessionStorage.clear();
        gameFunction.resetScore();
        gameFunction.difficulty();
        element.choicesContainer.innerHTML = '';
        element.gameoverContainer.style.display = 'none';
        element.restartBtn.style.display = 'none';
        element.timerContainer.style.visibility = 'visible';
        gameFunction.choicesRandom();
        gameFunction.displayColoredWord();
        gameFunction.getChoices();
        gameFunction.choiceListener();
        gameFunction.timer();
        gameFunction.timeout();
        element.newBest.style.display = 'none';
    },
    updateScore: function(overseer) {
        if (overseer == false) {
            gameFunction.resetScore();
        } else {
            var currentScore = parseInt(element.scoreValueContainer.textContent);
            var newScore = currentScore + 1;
            element.scoreValueContainer.textContent = newScore;
            element.thisScore.textContent = newScore;
            if (newScore > gameFunction.bestScoreStorage()) {
                newScore = parseInt(newScore);
                localStorage.setItem('colour_best_score', newScore);
                element.newBest.style.display = 'block';
            }
            element.bestScoreValue.textContent = gameFunction.bestScoreStorage();
        }
    },
    startGame: function() {
        element.startBtn.style.display = 'none';
        element.titleContainer.style.display = 'none';
        element.gameInfo.style.display = 'none';
        element.footer.style.display = 'none';
        element.timerContainer.style.display = 'block';
        element.timerContainer.style.visibility = 'visible';
        element.scoreContainer.style.display = 'block';
        element.coloredWordContainer.style.display = 'block';
        element.choicesContainer.style.display = 'block';
        gameFunction.choicesRandom();
        gameFunction.difficulty();
        gameFunction.displayColoredWord();
        gameFunction.getChoices();
        gameFunction.choiceListener();
        gameFunction.timer();
        gameFunction.timeout();
    },
};
