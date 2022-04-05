let level1;



function startGame() {
    initLevel1();
    init();
    hideStartScreenDisplayGameContent();
}




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

function hideStartScreenDisplayGameContent() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameContent').classList.remove('d-none');
}


