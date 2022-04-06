class World {
    character = new Character(); // bei neuen Variablen in Klassen braucht man auch kein "Let" davor wie sonst

    level = level1;
    // backgroundObjects = level1.backgroundObjects;
    // clouds = level1.clouds;
    // enemies = level1.enemies;

    highscore;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    hitpointsBar = new HitpointsBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    endbossTinyChicken = [];
    tinyChickenSpawned = false;
    throwableBottlesArray = [];
    amountOfBottlesToThrow = 0;
    endboss = this.level.endboss[0];

    //Variables for highscore:
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

    hurt_sound = new Audio('audio/hurt.mp3');
    collectBottle_sound = new Audio('audio/bottle.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottleSplash_sound = new Audio('audio/glass.mp3');
    bottleThrow_sound = new Audio('audio/throw.mp3');
    endboss_sound = new Audio('audio/chicken.mp3');
    won_sound = new Audio('audio/win.mp3');
    lost_sound = new Audio('audio/lost.mp3');
    background_music = new Audio('audio/music.mp3');
    endGameStatus = false;

    LoopBackgroundMusic() {
        if (this.level.endboss[0].energy > 0 && this.character.energy > 0) {
            this.background_music.volume = 0.25;
            this.background_music.play();
        } else {
            this.background_music.pause();
        }
    }



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




    constructor(canvas, keyboard) {
        this.adjustVolumeOfSounds();
        this.ctx = canvas.getContext('2d'); // ermöglich dem Canvas die Bilder im 2D Format hinzuzufügen, in der 'ctx' variable gespeichert
        this.canvas = canvas; //in das globale Canvas von World.class wird der Parameter Canvas gespeichert, für die untere draw methode,
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    run() {

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
        }, 70); // 200

        setInterval(() => this.checkThrowObjects(), 200);
        setInterval(() => this.checkCollisions(), 300);
        setInterval(() => this.spawnTinyChickenIfEndbossIsAngry(), 1100);

    }

    checkIfLostOrWon() {
        this.gameWon();
        this.gameLost();
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.amountOfBottlesToThrow > 0) {
            this.bottleThrow_sound.play();
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 35);
            this.throwableBottlesArray.push(bottle);
            this.amountOfBottlesToThrow -= 1;
            this.bottleBar.amountOfBottles -= 1;
            setTimeout(() => {
                this.bottleSplash_sound.play();
            }, 1000);
            setTimeout(() => this.throwableBottlesArray.splice(0, 1), 1300);
            this.bottleBar.updateBottleBar(this.bottleBar.amountOfBottles);
        }
    }


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


    spawnEndbossTinyChicken() {
        if (!this.tinyChickenSpawned) {
            let tinyChicken = new EndbossTinyChicken();
            this.endbossTinyChicken.push(tinyChicken);
            this.tinyChickenSpawned = true;
            setTimeout(() => this.tinyChickenSpawned = false, 600);
        }
    }

    spawnTinyChickenIfEndbossIsAngry() {
        if (this.endboss.energy == 10) {
            let tinyChicken = new EndbossTinyChicken();
            this.endbossTinyChicken.push(tinyChicken);
        }
    }


    checkCollisions() {
        this.checkChickenCollisions();
        this.checkEndbossCollisions();
        this.checkTinyChickenCollisions();
        this.correctGroundPositionIfWrong();
    }

    checkEndbossCollisions() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.hitpointsBar.setPercentage(this.character.energy);
            this.hurt_sound.play();
        }
    }



    characterAboveGround(enemy) {
        return this.character.isJumpingOnChicken(enemy) && this.character.isAboveGround() && enemy.energy != 0 && this.character.speedY < 0;
    }

    // checkJumpOnChickens() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (!this.character.chickenDying && this.character.isAboveGround && this.character.isColliding(enemy) && this.character.applyGravity()) {
    //             enemy.hit();
    //             this.character.chickenDying = true;
    //             setTimeout(() => this.character.chickenDying = false, 300);
    //             setTimeout(() => this.level.enemies.splice(index, 1), 100);
    //         }
    //     });
    // }

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

    correctGroundPositionIfWrong() {
        if (this.character.isUnderGround() && this.character.vulnerable && this.character.speedY < 0) {
            this.character.correctGroundPos();
        }
    }

    checkIfCharacterIsVulnerable() {
        if (!this.character.isAboveGround()) {
            this.character.vulnerable = true;
        }
    }

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


    setWorld() {
        this.character.world = this; //Hier wird dem Character Objekt/Klasse Zugriff auf alles von World gegeben
    }





    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); // Löscht die derzeitigen Bilder im Canvas sodass sie nicht dupliziert angezeigt werden 

        this.ctx.translate(this.camera_x, 0);

        //-- Space for all movable Objects--
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottlesArray);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.endbossTinyChicken);

        //--- Space for fixed Objects----
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.hitpointsBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.drawBarAndPlaySoundIfNearEndboss();
        // this.drawBarIfNearEndboss();

        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        // mit Hilfe von requestAnimationFrame wird draw() immer wieder aufgerufen (abhängig von der Grafikkarte)
        let self = this;
        requestAnimationFrame(function () { //diese Funktion wird ausgeführt sobald alles in der draw Funktion gezeichtnet wurde, asynchron wiederholt es so oft wie die Grafikkarte es hergibt
            self.draw(); //hier funktioniert this nicht mehr, deswegen erstellen wir eine Variable self (2 zeilen drüber), welcher wir this zuweisen
        });
    }


    addObjectsToMap(objects) { // ForEach schleife, welche 
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


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


    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    drawBarAndPlaySoundIfNearEndboss() {
        if (this.character.x > 2000 && this.endboss.hadContactWithEndboss) {
            this.drawBarIfNearEndboss();
            // this.playSoundIfNearEndboss();
        }
    }

    drawBarIfNearEndboss() {
        this.addToMap(this.endbossBar);
        this.playSoundIfNearEndboss();
    }

    playSoundIfNearEndboss() {
        if (this.character.x > 2000 && this.level.endboss[0].energy > 0) {
            this.endboss_sound.play();
            this.endboss_sound.loop = true;
        } else {
            this.endboss_sound.pause();
        }
    }

    //**Highscore related code */
    //17 chicken, 100 life(-5 when hit), 10 coins, 17 bottles, endboss needs 10 hits

    calcCurrentHighscore() {
        this.updateVariablesForHighscore();
        this.multiplyAddVariables();
        this.renderCurrentScore();
    }

    updateVariablesForHighscore() {
        this.collectedCoins = this.coinBar.amountOfCoins;
        this.killedChicken = this.amountOfBrownChickensForHighscore - this.level.enemies.length;
        this.characterHitpoints = this.character.energy;
        this.endbossHitpoints = this.endboss.energy;
    }

    multiplyAddVariables() {
        let chikenAndCoins = (this.killedChicken + this.collectedCoins) * 5;
        let allHitpoints = (100 - this.endbossHitpoints) + this.characterHitpoints;
        if (this.characterHitpoints == 100 && this.endboss.isDead()) {
            allHitpoints += 50;
        }
        this.currentScore = chikenAndCoins + allHitpoints;
    }

    renderCurrentScore() {
        this.currentScoreContainer.innerHTML = this.currentScore;
    }

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

    hideCanvasDisplayGameEnd() {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('fullScreen').classList.add('d-none');
        document.getElementById('endGameContainer').classList.remove('d-none');
    }




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


    muteAllNotEndgameSounds() {
        this.hurt_sound.volume = 0;
        this.collectBottle_sound.volume = 0;
        this.coin_sound.volume = 0;
        this.bottleSplash_sound.volume = 0;
        this.bottleThrow_sound.volume = 0;
        this.endboss_sound.volume = 0;
    }



    NewHighscore() {
        return this.currentScore > Number(this.highestScore.innerHTML);
    }


    displayHighscoreInput() {
        if (this.NewHighscore()) {
            this.hiddenHighscoreContainer.classList.remove('d-none');
            this.hiddenHighscoreContainer.classList.add('d-flex');
            this.highestScoreDisplayed.innerHTML = this.currentScore;
        }
    }

    restyleRestartButtonForEndscreen() {
        document.getElementById('restartBtn').style.bottom = '-446px';
        document.getElementById('restartBtn').style.left = '333px';
        document.getElementById('restartBtn').style.width = '68px';
    }





}