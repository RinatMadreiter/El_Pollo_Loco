class Chicken extends MovableObject {
    height = 80;
    width = 60;
    y = 345;
    energy = 4;
    intervalAnimation = 200;
  

    IMAGES_WALKING = [
        'img/basic_chicken_enemies/brown_chicken/walking1.png',
        'img/basic_chicken_enemies/brown_chicken/walking2.png',
        'img/basic_chicken_enemies/brown_chicken/walking3.png'
    ];
    IMAGE_DEAD = [
        'img/basic_chicken_enemies/brown_chicken/dead.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/basic_chicken_enemies/brown_chicken/walking1.png'); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

        this.x = 800 + Math.random() * 2000; //zahl zwischen 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.speed = 0.5 + Math.random() * 1.5; 

        this.animate();
    }


/*     animate() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD);
        } else {

            setInterval(() => {
                this.otherDirection = false;
                this.moveLeft();
            }, 17);

            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 200);
        }
    } */


    //vom liveCall to implement
    animate() {
        let moveInterval = setInterval(() => {
            if (!this.isDead()) {
                this.otherDirection = false;
                this.moveLeft();
            } else {
                //ToDo
                clearInterval(moveInterval);
            }
        }, 17);

        let playAnimationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGE_DEAD);
                setTimeout(() => {
                    clearInterval(playAnimationInterval);
                }, this.IMAGE_DEAD.length * this.intervalAnimation);
            } else {
                //ToDo
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, this.intervalAnimation); //200ms
    }



}