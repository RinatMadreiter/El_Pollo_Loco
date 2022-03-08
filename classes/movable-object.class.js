class MovableObject extends DrawableObject {  //wie eine Schablone 

    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    otherDirection = false;


    playAnimation(images) {
        let i = this.currentImage % images.length; //Walk Animation
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 40);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //ThrowableObject should always fall
            return true
        } else {
            return this.y < 265;
        }
    }

    jump() {
        this.speedY = 30;
    }





    // character.isColliding(chicken)
    isColliding(movableObject) {
        return this.x + this.width > movableObject.x &&
            this.y + this.height > movableObject.y &&
            this.x < movableObject.x &&
            this.y < movableObject.y + movableObject.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }



}