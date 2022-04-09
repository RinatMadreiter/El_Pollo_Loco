class ThrowableObject extends MovableObject {

    /**
     * define ThrowableObject variables
     */
    groundPosition = 360;


    /**
     * define bottle-images: 
     * 1) flying
     * 2) splashing
     */
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


    /**
     * loadImages set variables & load @function throw() & @function animate()
     * @param {numnber} x 
     * @param {number} y 
     */
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


    /**
     * throw objects, apply gravity
     * @param {numnber} x 
     * @param {number} y 
     */
    throw(x, y) {

        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 10;
            }
        }, 25);


    }


    /**
     * animate bottles flying and splashing interval 80ms
     */
    animate() {
        let animateInterval = setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_BOTTLE_FLYING);
            } else {
                this.changeImgSize(80, 80);
                this.playAnimation(this.IMAGES_BOTTLE_SPLASHING);
                setTimeout(() => {
                    clearInterval(animateInterval);
                }, this.IMAGES_BOTTLE_SPLASHING.length * 80);
            }

        }, 80);
    }


    /**
     * change size for splashing animation used in @function animate()
     * @param {number} height of img
     * @param {number} width of img
     */
    changeImgSize(height, width) {
        this.height = height;
        this.width = width;
    }


}