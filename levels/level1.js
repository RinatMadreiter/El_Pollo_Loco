/**
 * define level1 for new @instance of "Level" used in @function "initLevel1()"
 * 
 */
let level1;
let startSound = new Audio('audio/start.mp3');
startSound.volume = 0.2;


/**
 * init world and start game when clicked on "Click here to start the Game " Button at start screen
 */
function startGame() {
    startSound.play();
    initLevel1();
    init();
    hideStartScreenDisplayGameContent();
}


/**
 * initialize level 1 with a new @instance of "Level" class with these parametes in the set order:
 *  @param {array} enemies array filled with all enemies
 * @param {array} endboss array filled with endboss
 * @param {array} clouds array filled with all clouds
 * @param {array} backgroundObjects array filled with all backgroundObjects
 * @param {array} coins array filled with all coins
 * @param {array} bottles array filled with all bottles
 */
function initLevel1() {

    level1 = new Level(

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -720),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -720),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -720),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720),

            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 1440),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 1440),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 1440),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 2160),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 2160),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 2160),

            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 2880),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 2880),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 2880),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 3600),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 3600),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 3600)
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()

        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
    );

}


/**
 * hide startscreen and display game
 */
function hideStartScreenDisplayGameContent() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameContent').classList.remove('d-none');
}


