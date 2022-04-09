class Chicken extends MovableObject {

    /**
     * define Chicken variables
     */
    height = 80;
    width = 60;
    y = 345;
    energy = 4;
    intervalAnimation = 200;
    currentImage = 0;
  

    /**
     * define Chicken img-arrays:
     * walking, dead
     */
    IMAGES_WALKING = [
        'img/basic_chicken_enemies/brown_chicken/walking1.png',
        'img/basic_chicken_enemies/brown_chicken/walking2.png',
        'img/basic_chicken_enemies/brown_chicken/walking3.png'
    ];
    IMAGE_DEAD = [
        'img/basic_chicken_enemies/brown_chicken/dead.png'
    ];


    /**
     * load images from arrays, random x & random speed, animate 
     */
    constructor() {
        super().loadImage('img/basic_chicken_enemies/brown_chicken/walking1.png'); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte
        this.x = 800 + Math.random() * 2000; //zahl zwischen 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.speed = 0.5 + Math.random() * 1.5; 

        this.animate();
    }


   /**
    * animate walking or dead, 2 intervals 17ms & 200ms
    */
    animate() {
        let moveInterval = setInterval(() => {
            if (!this.isDead()) {
                this.otherDirection = false;
                this.moveLeft();
            } else {
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
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, this.intervalAnimation); //200ms
    }



}