class World {
    // edge = -720;
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
    // amountOfCoins = this.coinBar.amountOfCoins;
    throwableObjects = [];
    // otherDirection = false;


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
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoins();
        }, 70);//200
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 35);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // console.log('collision with Character', enemy);
                this.character.hit();
                this.hitpointsBar.setPercentage(this.character.energy);
                // console.log('energie is ', this.character.energy);
            }
        });
    }

    checkCoins() {
        this.level.coins.forEach((coin, index) => { //es handelt sich hierbei um eine Anonyme funktion mit 2 Parametern
            if(this.character.isColliding(coin)) {
                this.coinBar.collectCoins();
                // console.log('index is ', index);
                this.level.coins.splice(index, 1);
                this.coinBar.updateCoinBar(this.coinBar.amountOfCoins);
                // console.log(' Coin Collision Happened \n\n Amount of Coins is = ' + this.coinBar.amountOfCoins);
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
        this.addObjectsToMap(this.throwableObjects);
        // debugger;
        this.addObjectsToMap(this.level.coins);

        //--- Space for fixed Objects----
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.hitpointsBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        //  draw() wird immer wieder aufgerufen
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

}