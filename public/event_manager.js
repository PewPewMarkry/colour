document.addEventListener("DOMContentLoaded", function() {
    gameFunction.bestScoreStorage();
    gameFunction.lostCountStorage();
    gameFunction.resetScore();
    gameFunction.muteStateStorage();
});
element.startBtn.addEventListener('click', function() {
    soundeffect.select.play();
    gameFunction.startGame();
});
element.leaderboardBtn.addEventListener('click', function() {
    soundeffect.select.play();
    element.leaderboardContainer.style.display = 'block';
});
element.dismissLeaderboardBtn.addEventListener('click', function() {
    soundeffect.back.play();
    element.leaderboardContainer.style.display = 'none';
});
element.aboutBtn.addEventListener('click', function() {
    soundeffect.select.play();
    element.aboutContainer.style.display = 'block';
});
//element.glitch.addEventListener('click', function() {
//    soundeffect.select.play();
//    window.open("https://glitch.com/edit/#!/remix/colour");
//});
element.dismissAboutBtn.addEventListener('click', function() {
    soundeffect.back.play();
    element.aboutContainer.style.display = 'none';
});
element.settingsBtn.addEventListener('click', function() {
    soundeffect.select.play();
    element.settingsContainer.style.display = 'block';
});
element.soundOff.addEventListener('click', function() {
    localStorage.setItem('colour_mute_state', 'false');
    gameFunction.muteStateStorage();
    soundeffect.select.play();
});
element.soundOn.addEventListener('click', function() {
    localStorage.setItem('colour_mute_state', 'true');
    gameFunction.muteStateStorage();
});
element.resetBtn.addEventListener('click', function() {
    soundeffect.select.play();
    localStorage.removeItem('colour_best_score');
    gameFunction.bestScoreStorage();
    localStorage.removeItem('colour_lost_count');
    gameFunction.lostCountStorage();
});
element.dismissSettingsBtn.addEventListener('click', function() {
    element.settingsContainer.style.display = 'none';
    soundeffect.back.play();
});
element.tweetBtn.addEventListener('click', function() {
    soundeffect.select.play();
    window.open("https://twitter.com/intent/tweet?related=PewPewMarkry&text=Just%20scored%20"+parseInt(element.scoreValueContainer.textContent)+"%20points%20in%20Colour.%20Can%20you%20beat%20my%20score%3F&url=https%3A%2F%2Fcolour.glitch.me");
});
element.restartBtn.addEventListener('click', function() {
    soundeffect.select.play();
    gameFunction.restart();
});
element.goHome.addEventListener('click', function() {
    soundeffect.back.play();
    sessionStorage.clear();
    gameFunction.resetScore();
    element.startBtn.style.display = 'block';
    element.gameInfo.style.display = 'block';
    element.timerContainer.style.display = 'none';
    element.titleContainer.style.display = 'block';
    element.scoreContainer.style.display = 'none';
    element.footer.style.display = 'block';
    element.coloredWordContainer.style.display = 'none';
    element.choicesContainer.style.display = 'none';
    element.gameoverContainer.style.display = 'none';
    element.choicesContainer.innerHTML = '';
    element.newBest.style.display = 'none';
});
