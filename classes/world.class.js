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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log('collision with Character', enemy);
                    this.character.hit();
                    console.log('energie is ', this.character.energy);
                }
            });
        }, 200);
    }


    setWorld() {
        this.character.world = this; //Hier wird dem Character Objekt/Klasse Zugriff auf alles von World gegeben
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () { //diese Funktion wird ausgeführt sobald alles in der draw Funktion ausgeführt wurde, asynchron später ausgeführt
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}