class World {
    character = new Character(); // bei neuen Variablen in Klassen braucht man auch kein "Let" davor wie sonst

    level = level1;
    // backgroundObjects = level1.backgroundObjects;
    // clouds = level1.clouds;
    // enemies = level1.enemies;

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

    amountOfBrownChickens = this.level.enemies.length;
    amountOfBrownChickensForHighscore = this.amountOfBrownChickens;
    characterHitpoints = 100;
    endbossHitpoints = 100;
    collectedCoins = 0;
    killedChicken = 0;
    currentScore = 0;






    constructor(canvas, keyboard) {
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
            this.checkHitChicken();
            this.checkHitEndboss();
            this.calcCurrentHighscore();
        }, 70); // 200
        setInterval(() => this.checkThrowObjects(), 200);
        setInterval(() => this.checkCollisions(), 300);
        setInterval(() => this.spawnTinyChickenIfEndbossIsAngry(), 1100);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.amountOfBottlesToThrow > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 35);
            this.throwableBottlesArray.push(bottle);
            this.amountOfBottlesToThrow -= 1;
            this.bottleBar.amountOfBottles -= 1;
            setTimeout(() => this.throwableBottlesArray.splice(0, 1), 1300);
            this.bottleBar.updateBottleBar(this.bottleBar.amountOfBottles);
        }
    }


    checkBottles() {
        this.level.bottles.forEach((bottle, index) => { //es handelt sich hierbei um eine Anonyme funktion mit 2 Parametern
            if (this.character.isColliding(bottle)) {
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
    }

    checkEndbossCollisions() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.hitpointsBar.setPercentage(this.character.energy);
        }
    }

    checkChickenCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.hitpointsBar.setPercentage(this.character.energy);
            }
        });
    }

    checkTinyChickenCollisions() {
        this.endbossTinyChicken.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.hitpointsBar.setPercentage(this.character.energy);
                console.log('collided with tiny chicken');
            }
        });
    }


    checkCoins() {
        this.level.coins.forEach((coin, index) => { //es handelt sich hierbei um eine Anonyme funktion mit 2 Parametern
            if (this.character.isColliding(coin)) {
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
        this.addObjectsToMap(this.level.bottles); // die zufällig generierten Flaschen auf dem weg
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.endbossTinyChicken);

        //--- Space for fixed Objects----
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.hitpointsBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.drawBarIfNearEndboss();

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

        movableObject.drawFrame(this.ctx);
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


    drawBarIfNearEndboss() {
        if (this.character.x > 2000 && this.endboss.hadContactWithEndboss) {
            this.addToMap(this.endbossBar);
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
        this.currentScore = chikenAndCoins + allHitpoints;
    }

    renderCurrentScore() {
        this.currentScoreContainer.innerHTML = this.currentScore;
    }
}