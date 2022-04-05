let canvas;
let world;
let keyboard = new Keyboard();






function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}


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

    // console.log(event);
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





function openFullscreen() {
    document.getElementById('canvas').requestFullscreen();
}



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

function hideHighscoreInput() {
    world.hiddenHighscoreContainer.classList.remove('d-flex');
    world.hiddenHighscoreContainer.classList.add('d-none');
}

function saveScoreLocalStorage() {
    let savedPlayerNameAsText = JSON.stringify(world.savedPlayerName);
    localStorage.setItem('savedPlayerName', savedPlayerNameAsText);
    let savedHighscoreAsText = JSON.stringify(world.savedHighscore);
    localStorage.setItem('savedHighscore', savedHighscoreAsText);
}

function loadScoreLocalStorage() {
    let savedPlayerNameAsText = localStorage.getItem('savedPlayerName');
    let savedHighscoreAsText = localStorage.getItem('savedHighscore');

    if (savedPlayerNameAsText && savedHighscoreAsText) {
        world.savedHighscore = JSON.parse(savedHighscoreAsText);
        world.savedPlayerName = JSON.parse(savedPlayerNameAsText);
    }
}

function renderLoadOldHighscore() {
    loadScoreLocalStorage();
    renderOldHighscore();
}

function renderOldHighscore() {
    world.highestScore.innerHTML = world.savedHighscore[0];
    world.player.innerHTML = world.savedPlayerName[0];
}

function reloadPage() {
    location.reload();
}