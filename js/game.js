/**
 * define canvas, world and new @instance of Keyboard()
 */
let canvas;
let world;
let keyboard = new Keyboard();
let restartSound = new Audio('audio/start.mp3');
restartSound.volume = 0.2;


/**
 * init function, set world to a new @instance of World()
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * if mentioned key pressed set according variable to true
 */
window.addEventListener('keydown', (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }

    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }

    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }

    if (event.key == " ") {
        keyboard.SPACE = true;
    }

    if (event.key == "d") {
        keyboard.D = true;
    }

});


/**
 * change Keyboard-Variables to "false" if keyup
 */
window.addEventListener('keyup', (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }

    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }

    if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }

    if (event.key == " ") {
        keyboard.SPACE = false;
    }

    if (event.key == "d") {
        keyboard.D = false;
    }

});


/**
 * open fullscreen if clicked on button with @id "fullScreen"
 */
function openFullscreen() {
    document.getElementById('canvas').requestFullscreen();
}


/**
 * reload page if clicked on button with @id "restartBtn"
 */
function reloadPage() {
    restartSound.play();
    setTimeout(() => {
        location.reload();
    }, 600);
}

/**
 * Highscore related code start here: 
 * rest of Highscore related code you will find in @file: "classes/world_level_keyboard/world.class.js" at the end
 * 
 * save highscore player name in @array "currentScore"
 * player name from input in @array "playerName"  
 * save score on localstorage
 */
function saveHighscore() {
    if (!world.playerName.value) {
        alert('Please enter a Player-Name');
    } else {
        world.savedPlayerName.splice(0, 1);
        world.savedPlayerName.push(world.playerName.value);
        world.savedHighscore.splice(0, 1);
        world.savedHighscore.push(world.currentScore);
        saveScoreLocalStorage();
        alert('Your new highscore was succesfully saved!');
        hideHighscoreInput();
        renderLoadOldHighscore();
    }
}


/**
 * hide highscore HTML inputfield used in @function saveHighscore()
 */
function hideHighscoreInput() {
    world.hiddenHighscoreContainer.classList.remove('d-flex');
    world.hiddenHighscoreContainer.classList.add('d-none');
}


/**
 * save new highscore and typed in player name on localstorage used in @function saveHighscore()
 */
function saveScoreLocalStorage() {
    let savedPlayerNameAsText = JSON.stringify(world.savedPlayerName);
    localStorage.setItem('savedPlayerName', savedPlayerNameAsText);
    let savedHighscoreAsText = JSON.stringify(world.savedHighscore);
    localStorage.setItem('savedHighscore', savedHighscoreAsText);
}


/**
 * load highscore and player name on localstorage used in @function renderLoadOldHighscore() 
 */
function loadScoreLocalStorage() {
    let savedPlayerNameAsText = localStorage.getItem('savedPlayerName');
    let savedHighscoreAsText = localStorage.getItem('savedHighscore');

    if (savedPlayerNameAsText && savedHighscoreAsText) {
        world.savedHighscore = JSON.parse(savedHighscoreAsText);
        world.savedPlayerName = JSON.parse(savedPlayerNameAsText);
    }
}


/**
 * load saved highscore and render it immediately used in @function saveHighscore() 
 */
function renderLoadOldHighscore() {
    loadScoreLocalStorage();
    renderOldHighscore();
}


/**
 * render highscore in HTML used in @function renderLoadOldHighscore()
 */
function renderOldHighscore() {
    world.highestScore.innerHTML = world.savedHighscore[0];
    world.player.innerHTML = world.savedPlayerName[0];
}

//todo 1) make responsive
//todo 2) Impressum
//todo 3) Cookiebar
