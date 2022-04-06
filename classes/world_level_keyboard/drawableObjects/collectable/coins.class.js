class Coin extends DrawableObject {


    height = 40;
    width = 40;
    static lastCoinXPos = 250;


    IMAGE_COINS = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGE_COINS[0]); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte
        this.x = Coin.lastCoinXPos + (100 + Math.random() * 365);
        this.loadImages(this.IMAGE_COINS);
        Coin.lastCoinXPos = this.x;
        this.y = 70 + Math.random() * 145; //zahl zwischen 100 und 150

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGE_COINS);
        }, 200);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //Walk Animation
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}