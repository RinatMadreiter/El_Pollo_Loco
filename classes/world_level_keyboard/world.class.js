class World {

    /**
     * set level from level1.js file
     */
    level = level1;
    // backgroundObjects = level1.backgroundObjects;
    // clouds = level1.clouds;
    // enemies = level1.enemies;


    /**
     * create new Instances of:
     * 1) 4 static Bars
     * 2) main character
     * 
     */
    hitpointsBar = new HitpointsBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    character = new Character();


    /**
     * create canvas related Variables
     */
    ctx;
    canvas;
    keyboard;
    camera_x = 0;


    /**
     * create variables for Tinychickens, ThrowableBottles, and Endboss
     */
    endbossTinyChicken = [];
    tinyChickenSpawned = false;
    throwableBottlesArray = [];
    amountOfBottlesToThrow = 0;
    endboss = this.level.endboss[0];


    /**
     * create variables for highscore:
     * 1) HTML Elements with ID for display
     * 2) variables for highscore calculation
     * 3) Highscore array for Player-Name & Highest Score
     */

    currentScoreContainer = document.getElementById('currentScore');
    highestScore = document.getElementById('highestScore');
    player = document.getElementById('player');
    highestScoreDisplayed = document.getElementById('highestScoreDisplayed');
    hiddenHighscoreContainer = document.getElementById('hiddenHighscoreContainer');
    playerName = document.getElementById('playerInput');

    amountOfBrownChickens = this.level.enemies.length;
    amountOfBrownChickensForHighscore = this.amountOfBrownChickens;
    characterHitpoints = 100;
    endbossHitpoints = 100;
    collectedCoins = 0;
    killedChicken = 0;
    currentScore = 0;

    savedHighscore = ['0'];
    savedPlayerName = ['Player-Name'];


    /**
     * create new audio-variables 
     */
    hurt_sound = new Audio('audio/hurt.mp3');
    collectBottle_sound = new Audio('audio/bottle.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottleSplash_sound = new Audio('audio/glass.mp3');
    bottleThrow_sound = new Audio('audio/throw.mp3');
    endboss_sound = new Audio('audio/chicken.mp3');
    won_sound = new Audio('audio/win.mp3');
    lost_sound = new Audio('audio/lost.mp3');
    background_music = new Audio('audio/music.mp3');


    /**
     * create variables for endgame
     */
    endGameStatus = false;


    /**
     * plays Backgroundmusic if endboss and character are alive
     */
    LoopBackgroundMusic() {
        if (this.level.endboss[0].energy > 0 && this.character.energy > 0) {
            this.background_music.volume = 0.25;
            this.background_music.play();
        } else {
            this.background_music.pause();
        }
    }


    /**
     * set the volume of all sounds 
     */
    adjustVolumeOfSounds() {
        this.hurt_sound.volume = 0.1;
        this.collectBottle_sound.volume = 0.2;
        this.coin_sound.volume = 0.05;
        this.bottleSplash_sound.volume = 0.1;
        this.bottleThrow_sound.volume = 0.1;
        this.endboss_sound.volume = 0.1;
        this.won_sound.volume = 0.2;
        this.lost_sound.volume = 0.1;
    }


    /**
     * @param {object} canvas HTML Canvas Element
     * @param {instance} keyboard Instance from game.js
     */
    constructor(canvas, keyboard) {
        this.adjustVolumeOfSounds();
        this.ctx = canvas.getContext('2d'); // ermöglich dem Canvas die Bilder im 2D Format hinzuzufügen, in der 'ctx' variable gespeichert
        this.canvas = canvas; //in das globale Canvas von world wird der Parameter Canvas gespeichert, für die untere draw methode,
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * main function with all intervalls for game Logic
     */
    run() {
        this.mainGameLogicInterval70ms();
        this.slowerGameLogicIntervals200to1100ms();
    }


    /**
     * Main Intervals:
     * 1) Coins & Bottles
     * 2) Check Hit: Chicken, TinyChickens, Endboss
     * 3) checkIfCharacterIsVulnerable
     * 4) Calc Highscore
     * 5) Play Endbosssound
     * 6) Check for end of game
     */
    mainGameLogicInterval70ms() {
        setInterval(() => {
            this.checkCoins();
            this.checkBottles();
            this.checkIfCharacterIsVulnerable();
            this.checkHitChicken();
            this.checkHitTinyChicken();
            this.checkHitEndboss();
            this.calcCurrentHighscore();
            this.playSoundIfNearEndboss();
            this.LoopBackgroundMusic();
            this.checkIfLostOrWon();
        }, 70);
    }


    /**
     * check for end of game
     */
    checkIfLostOrWon() {
        this.gameWon();
        this.gameLost();
    }


    /**
     * 3 Gamelogic intervals with different speed; 
     * 1) ThrowObjects 200ms
     * 2) Collisions 300ms
     * 3) spawnTinyChickenIfEndbossIsAngry 1100ms
     */
    slowerGameLogicIntervals200to1100ms() {
        setInterval(() => this.checkThrowObjects(), 200);
        setInterval(() => this.checkCollisions(), 300);
        setInterval(() => this.spawnTinyChickenIfEndbossIsAngry(), 1100);
    }


    /**
     * throw Bottles function
     * playSounds, add bottle to throwableBottlesArray, splice afterwards and update bottlebar
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.amountOfBottlesToThrow > 0) {
            this.bottleThrow_sound.play();
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 35);
            this.throwableBottlesArray.push(bottle);
            this.amountOfBottlesToThrow -= 1;
            this.bottleBar.amountOfBottles -= 1;
            setTimeout(() => this.bottleSplash_sound.play(), 1000);
            setTimeout(() => this.throwableBottlesArray.splice(0, 1), 1300);
            this.bottleBar.updateBottleBar(this.bottleBar.amountOfBottles);
        }
    }


    /**
     * check collision with bottles, if colliding collect splice bottle & update bottle-bar
     */
    checkBottles() {
        this.level.bottles.forEach((bottle, index) => { //es handelt sich hierbei um eine Anonyme funktion mit 2 Parametern
            if (this.character.isColliding(bottle)) {
                this.collectBottle_sound.play();
                this.bottleBar.collectBottles(); // increase AmountOfBottles for BottleBar +=1
                this.level.bottles.splice(index, 1); //remove bottle from canvas
                this.bottleBar.updateBottleBar(this.bottleBar.amountOfBottles);
                this.amountOfBottlesToThrow += 1;
            }
        });
    }


    /**
     * check if thrown bottles hit chicken with a nested foreachloop inside a foreachloop, if yes splice chicken 
     */
    checkHitChicken() {
        this.level.enemies.forEach((enemy, index) => {
            this.throwableBottlesArray.forEach(bottle => {
                if (bottle.isColliding(enemy) && !this.character.chickenDying) {
                    enemy.hit();
                    this.character.chickenDying = true;
                    setTimeout(() => this.character.chickenDying = false, 300);
                    setTimeout(() => this.level.enemies.splice(index, 1), 100);
                }
            });
        });
    }


    /**
     * check if thrown bottle hits tinychicken with a nested foreachloop inside a foreachloop, if yes splice chicken 
     */
    checkHitTinyChicken() {
        this.endbossTinyChicken.forEach((enemy, index) => {
            this.throwableBottlesArray.forEach(bottle => {
                if (bottle.isColliding(enemy) && !this.character.chickenDying) {
                    enemy.hit();
                    this.character.chickenDying = true;
                    setTimeout(() => this.character.chickenDying = false, 300);
                    setTimeout(() => this.endbossTinyChicken.splice(index, 1), 100);
                }
            });
        });
    }


    /**
     * check if thrown bottle hits endboss, if yes enboss.energy -= 5
     */
    checkHitEndboss() {
        this.throwableBottlesArray.forEach((bottle) => {
            if (bottle.isColliding(this.endboss) && !this.endboss.endbossGettingHit) {
                this.endboss.hit();
                this.endboss.endbossGettingHit = true;
                this.endbossBar.setPercentage(this.endboss.energy -= 5);
                setTimeout(() => this.endboss.endbossGettingHit = false, 300);
                this.spawnEndbossTinyChicken();
            }
        });
    }


    /**
     * spawn tinychicken if endboss being hit
     */
    spawnEndbossTinyChicken() {
        if (!this.tinyChickenSpawned) {
            let tinyChicken = new EndbossTinyChicken();
            this.endbossTinyChicken.push(tinyChicken);
            this.tinyChickenSpawned = true;
            setTimeout(() => this.tinyChickenSpawned = false, 600);
        }
    }


    /**
     * spawn tinychicken if endboss.energy reaches 10
     */
    spawnTinyChickenIfEndbossIsAngry() {
        if (this.endboss.energy == 10) {
            let tinyChicken = new EndbossTinyChicken();
            this.endbossTinyChicken.push(tinyChicken);
        }
    }


    /**
     * pool all character collisions functions & correctgroundposition
     */
    checkCollisions() {
        this.checkChickenCollisions();
        this.checkEndbossCollisions();
        this.checkTinyChickenCollisions();
        this.correctGroundPositionIfWrong();
    }


    /**
     * check if character is colliding with endboss, if yes adjust characters energy and energy-bar, play sound
     */
    checkEndbossCollisions() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.hitpointsBar.setPercentage(this.character.energy);
            this.hurt_sound.play();
        }
    }


    /**
     * check if jumping on enemy
     * @param {Array} enemy single enemy  array, part of the enemies array
     * @returns if character is colliding with chicken, & is above Ground & character is falling
     */
    characterAboveGround(enemy) {
        return this.character.isJumpingOnChicken(enemy) && this.character.isAboveGround() && enemy.energy != 0 && this.character.speedY < 0;
    }


    /**
     * check if colliding with chickens on ground or above
     */
    checkChickenCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.characterAboveGround(enemy)) {
                this.character.vulnerable = false;
                this.character.jump();
                enemy.hit();
                this.level.enemies.splice(index, 1);
            }
            if (this.character.isColliding(enemy) && this.character.vulnerable) {
                this.character.hit();
                this.hitpointsBar.setPercentage(this.character.energy);
                this.hurt_sound.play();
            }
        });
    }


    /**
     * correct character's ground position if wrong after jump on chicken
     */
    correctGroundPositionIfWrong() {
        if (this.character.isUnderGround() && this.character.vulnerable && this.character.speedY < 0) {
            this.character.correctGroundPos();
        }
    }


    /**
     * helper function to prevent that character is getting hurt while jumping on chickens
     */
    checkIfCharacterIsVulnerable() {
        if (!this.character.isAboveGround()) {
            this.character.vulnerable = true;
        }
    }


    /**
     * check if colliding with tinychickens on ground or above
     */
    checkTinyChickenCollisions() {
        this.endbossTinyChicken.forEach((enemy, index) => {
            if (this.characterAboveGround(enemy)) {
                this.character.vulnerable = false;
                this.character.jump();
                enemy.hit();
                this.endbossTinyChicken.splice(index, 1);
            }
            if (this.character.isColliding(enemy) && this.character.vulnerable) {
                this.character.hit();
                this.hitpointsBar.setPercentage(this.character.energy);
                this.hurt_sound.play();
            }
        });
    }


    /**
     * check collision with coins, if yes update coinbar, play sound and splice
     */
    checkCoins() {
        this.level.coins.forEach((coin, index) => { //es handelt sich hierbei um eine Anonyme funktion mit 2 Parametern
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.coinBar.collectCoins();
                this.level.coins.splice(index, 1);
                this.coinBar.updateCoinBar(this.coinBar.amountOfCoins);
            }
        });
    }


    /**
     * enable the character.class.js to have access to world.class.js
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * draw everything to animate game,
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); // Löscht die derzeitigen Bilder im Canvas sodass sie nicht dupliziert angezeigt werden 
        this.ctx.translate(this.camera_x, 0);
        this.addAllMovableObjectsToMap();
        this.addAllFixedObjectsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.repeatRequestAnimationFrame(self);
    }


    /**
     * repeat draw function according to grapic prozessor/card to animate game
     * @param {object} draw() function
     */
    repeatRequestAnimationFrame(self) {
        requestAnimationFrame(function () { //diese Funktion wird ausgeführt sobald alles in der draw Funktion gezeichtnet wurde, asynchron wiederholt es so oft wie die Grafikkarte es hergibt
            self.draw(); //hier funktioniert this nicht mehr, deswegen erstellen wir eine Variable self (2 zeilen drüber), welcher wir this zuweisen
            // mit Hilfe von requestAnimationFrame wird draw() immer wieder aufgerufen (abhängig von der Grafikkarte)
        });
    }


    /**
     * pool all movableObjects for main @function draw() 
     */
    addAllMovableObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottlesArray);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.endbossTinyChicken);
    }


    /**
     * pool all fixedObjects for main @function draw() 
     */
    addAllFixedObjectsToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.hitpointsBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.drawBarAndPlaySoundIfNearEndboss();
    }


    /**
     * iterate throw given object-array for @function draw() with @function addTomap()
     * @param {array} objects 
     */
    addObjectsToMap(objects) { // ForEach schleife, welche 
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * add character to map depending on the direction for @function draw() 
     * @param {*} movableObject 
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
        // movableObject.drawFrame(this.ctx); //function to draw a frame around objects
    }


    /**
     * flip image if character direction changes
     * @param {array} movableObject @character
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    /**
     * flip image bacj if character direction changes
     * @param {array} movableObject @ character
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }


    /**
     * if character near endboss draw enboss-bar & play endboss sound
     */
    drawBarAndPlaySoundIfNearEndboss() {
        if (this.character.x > 2000 && this.endboss.hadContactWithEndboss) {
            this.addToMap(this.endbossBar);
            this.playSoundIfNearEndboss();
        }
    }


    /**
     * play sound if character near endboss
     */
    playSoundIfNearEndboss() {
        if (this.character.x > 2000 && this.level.endboss[0].energy > 0) {
            this.endboss_sound.play();
            this.endboss_sound.loop = true;
        } else {
            this.endboss_sound.pause();
        }
    }


    /** Highscore related code starts here:
     * rest of Highscore related code you will find in @file: "js/game.js" at the end
     * 
     * 17 chicken, 100 life(-5 when hit), 10 coins, 17 bottles, endboss needs 10 hits
     *
     * How the highscore is being calculated:
     * 5 points for each killed chicken 
     * 5 points for each collected coin
     * x points according to character.energy
     * 100 points if endboss killed
     * +50 extra points if character.energy = 100
     *
     * function to pool all highscore related functions
     */
    calcCurrentHighscore() {
        this.updateVariablesForHighscore();
        this.multiplyAddVariables();
        this.renderCurrentScore();
    }


    /**
     * update all highscore related variables
     */
    updateVariablesForHighscore() {
        this.collectedCoins = this.coinBar.amountOfCoins;
        this.killedChicken = this.amountOfBrownChickensForHighscore - this.level.enemies.length;
        this.characterHitpoints = this.character.energy;
        this.endbossHitpoints = this.endboss.energy;
    }


    /**
     * main highscore calc function
     */
    multiplyAddVariables() {
        let chikenAndCoins = (this.killedChicken + this.collectedCoins) * 5;
        let allHitpoints = (100 - this.endbossHitpoints) + this.characterHitpoints;
        if (this.characterHitpoints == 100 && this.endboss.isDead()) {
            allHitpoints += 50;
        }
        this.currentScore = chikenAndCoins + allHitpoints;
    }


    /**
     * render highscore in HTML
     */
    renderCurrentScore() {
        this.currentScoreContainer.innerHTML = this.currentScore;
    }


    /**
     * end of game related code starts here
     * 
     * if game won show game end screen and play win sound
     * if new highscore display highscsore overlay and input field for player
     */
    gameWon() {
        if (this.level.endboss[0].energy == 0 && this.endGameStatus == false) {
            this.endbossTinyChicken = [];
            setTimeout(() => {
                this.hideCanvasDisplayGameEnd();
                this.restyleRestartButtonForEndscreen();
                document.getElementById('gameWonIMG').classList.remove('d-none');
                this.muteAllNotEndgameSounds();
                this.won_sound.play();
                this.endGameStatus = true;
                this.displayHighscoreInput();
            }, 2000);

        }
    }


    /**
     * hide canvas display game end HTML elements
     */
    hideCanvasDisplayGameEnd() {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('fullScreen').classList.add('d-none');
        document.getElementById('endGameContainer').classList.remove('d-none');
    }


    /**
     * if gameLost show endscreen & play lost sound
     */
    gameLost() {
        if (this.character.energy == 0 && this.endGameStatus == false) {
            setTimeout(() => {
                this.hideCanvasDisplayGameEnd();
                this.restyleRestartButtonForEndscreen();
                document.getElementById('gameLostIMG').classList.remove('d-none');
                this.muteAllNotEndgameSounds();
                this.lost_sound.play();
                this.endGameStatus = true;
            }, 1000);
        }
    }


    /**
     * mute all game sounds for end of game
     */
    muteAllNotEndgameSounds() {
        this.hurt_sound.volume = 0;
        this.collectBottle_sound.volume = 0;
        this.coin_sound.volume = 0;
        this.bottleSplash_sound.volume = 0;
        this.bottleThrow_sound.volume = 0;
        this.endboss_sound.volume = 0;
    }


    /**
     * 
     * @returns check if currentScore is new highscore for @function gameWon()
     */
    NewHighscore() {
        return this.currentScore > Number(this.highestScore.innerHTML);
    }


    /**
     * display HTML highscoreInput used in @function gameWon()
     */
    displayHighscoreInput() {
        if (this.NewHighscore()) {
            this.hiddenHighscoreContainer.classList.remove('d-none');
            this.hiddenHighscoreContainer.classList.add('d-flex');
            this.highestScoreDisplayed.innerHTML = this.currentScore;
        }
    }


    /**
     * change restart button for endscreen
     */
    restyleRestartButtonForEndscreen() {
        document.getElementById('restartBtn').style.bottom = '-446px';
        document.getElementById('restartBtn').style.left = '333px';
        document.getElementById('restartBtn').style.width = '68px';
    }

}