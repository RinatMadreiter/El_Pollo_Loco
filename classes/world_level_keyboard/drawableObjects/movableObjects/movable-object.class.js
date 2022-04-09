class MovableObject extends DrawableObject {  //wie eine Schablone 

    /**
     * define MovableObject variables
     */
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    groundPosition = 265;


    /**
     * function to animate imgs
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; //Walk Animation
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * move objects to right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * move object to left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * apply gravity for jumps
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 40);
    }


    /**
     * check if above ground
     * @returns if y <  groundPosistion
     */
    isAboveGround() {
        return this.y < this.groundPosition;
    }


    /**
     * check if under ground
     * @returns if y >  groundPosistion
     */
    isUnderGround() {
        return this.y > this.groundPosition;
    }


    /**
     * correct ground position if y == !groundPosition
     */
    correctGroundPos() {
        if (this.y < this.groundPosition || this.y > this.groundPosition) {
            this.y = this.groundPosition;
        }
    }


    /**
     * jump, set y-speed to 30
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * check for rectangle collision
     * @param {array} movableObject 
     * @returns if colliding
     */
    isColliding(movableObject) {
        return this.x + this.width > movableObject.x &&
            this.y + this.height > movableObject.y &&
            this.x - 60 < movableObject.x &&
            this.y < movableObject.y + movableObject.height;
    }

 
    /**
     *  check for collision when jumpin on enemies to kill them
     * @param {array} movableObject 
     * @returns {boolean} collision happened or not
     */
    isJumpingOnChicken(movableObject) {
        return (this.x < movableObject.x + movableObject.width &&
            this.x + this.width + 75 > movableObject.x &&
            this.y < movableObject.y + movableObject.height &&
            this.height + this.y > movableObject.y)
    }


    /**
     * loose 5 energy
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    
    /**
     * check if energy is 0
     * @returns if dead / energy == 0
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * check if object is being hurt at the moment
     * @returns if timepassed is less then 1 second
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }



}