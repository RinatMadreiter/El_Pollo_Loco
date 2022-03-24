let canvas;
let world;
let keyboard = new Keyboard();
console.clear();






function init() {
    canvas = document.getElementById('canvas'); 
    world = new World(canvas, keyboard);
}






/**
 * change Keyboard-Variables to "true" if key is pressed
 */
window.addEventListener('keydown', (event) => {
    if(event.key == "ArrowRight"){
        keyboard.RIGHT = true;
    }

    if(event.key == "ArrowLeft"){
        keyboard.LEFT = true;
    }

    if(event.key == "ArrowDown"){
        keyboard.DOWN = true;
    }

    if(event.key == "ArrowUp"){
        keyboard.UP = true;
    }

    if(event.key == " "){
        keyboard.SPACE = true;
    }

    if(event.key == "d"){
        keyboard.D = true;
    }

    // console.log(event);
});



/**
 * change Keyboard-Variables to "false" if keyup
 */
window.addEventListener('keyup', (event) => {
    if(event.key == "ArrowRight"){
        keyboard.RIGHT = false;
    }

    if(event.key == "ArrowLeft"){
        keyboard.LEFT = false;
    }

    if(event.key == "ArrowDown"){
        keyboard.DOWN = false;
    }

    if(event.key == "ArrowUp"){
        keyboard.UP = false;
    }

    if(event.key == " "){
        keyboard.SPACE = false;
    }

    if(event.key == "d"){
        keyboard.D = false;
    }

});



