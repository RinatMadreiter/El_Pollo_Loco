class EndbossTinyChicken extends MovableObject {

    /**
     * define EndbossTinyChicken variables
     */
    x = world.level.endboss[0].x + 100;
    width = 60;
    height = 50;
    y = 375;
    speed = 3.5;
    intervalAnimation = 200;
    energy = 4;


    /**
     * define EndbossTinyChicken img arrays:
     * walking, dead
     */
    IMAGES_WALKING = [
        'img/basic_chicken_enemies/tiny_chicken/walking1.png',
        'img/basic_chicken_enemies/tiny_chicken/walking2.png',
        'img/basic_chicken_enemies/tiny_chicken/walking3.png',
    ];

    IMAGE_DEAD = ['img/basic_chicken_enemies/tiny_chicken/dead.png'];


    /**
     * load images, animate and set random speed
     */
    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.animate();
        this.speed = 2.5 + Math.random() * 4.5; //Zahl zwischen 1 und 7

    }


    /**
     * animate tinychikens
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


