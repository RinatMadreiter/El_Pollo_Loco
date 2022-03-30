class ThrowableObject extends MovableObject {

    groundPosition = 360;

    IMAGES_BOTTLE_FLYING = [
        'img/6.botella/Rotación/1.png',
        'img/6.botella/Rotación/2.png',
        'img/6.botella/Rotación/3.png',
        'img/6.botella/Rotación/4.png'
    ];

    IMAGES_BOTTLE_SPLASHING = [
        'img/6.botella/Rotación/Splash de salsa/1.png',
        'img/6.botella/Rotación/Splash de salsa/2.png',
        'img/6.botella/Rotación/Splash de salsa/3.png',
        'img/6.botella/Rotación/Splash de salsa/4.png',
        'img/6.botella/Rotación/Splash de salsa/5.png',
        'img/6.botella/Rotación/Splash de salsa/6.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6.botella/1.Marcador.png');
        this.loadImages(this.IMAGES_BOTTLE_FLYING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 15;
        this.throw();
        this.animate();
    }



    throw(x, y) {

        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 10;
            }
        }, 25);

        // if (!this.isAboveGround()) {
        //     debugger;
        //     this.speedY = 0;
        //     this.acceleration = 0;
        //     this.speed = 0;
        // }

    }

    animate() {
        let animateInterval = setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_BOTTLE_FLYING);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASHING);
                setTimeout(() => {
                    clearInterval(animateInterval);
                }, this.IMAGES_BOTTLE_SPLASHING.length * 80);
            }

        }, 80);
    }



}