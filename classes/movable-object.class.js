class MovableObject {  //wie eine Schablone 
    x = 120;
    y = 180;
    img;
    imageCache = {};
    height = 150;
    width = 100;
    speed = 0.15;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;




    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }


    /**
     * 
     * @param {Array} arr  ['img/image1.png, 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; //Walk Animation
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
        return this.y < 170;
    }

    jump() {
        this.speedY = 30;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) { //wird nur bei Character, Chicken und Endboss angezeigt
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isColliding(chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }
    
    hit() {
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy == 0;
    }


}