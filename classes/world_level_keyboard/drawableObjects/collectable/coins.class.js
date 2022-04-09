class Coin extends DrawableObject {

    /**
     * define Coin variables
     */
    height = 40;
    width = 40;
    static lastCoinXPos = 250;


    /**
     * define coin img array
     */
    IMAGE_COINS = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png'
    ];


    /**
     * load img, randomize x- and y-position of coins, animate, keep them apart from each other
     */
    constructor() {
        super().loadImage(this.IMAGE_COINS[0]); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte
        this.x = Coin.lastCoinXPos + (100 + Math.random() * 365);
        this.loadImages(this.IMAGE_COINS);
        Coin.lastCoinXPos = this.x;
        this.y = 70 + Math.random() * 145; //zahl zwischen 100 und 150

        this.animate();
    }


    /**
     * animate coins 200ms
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COINS);
        }, 200);
    }


    /**
     * animate function
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; //Walk Animation
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}