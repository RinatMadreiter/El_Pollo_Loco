class Coin extends DrawableObject {


    height = 40;
    width = 40;
    static lastCoinXPos = 250;


    IMAGE_COIN = [
        'img/8.Coin/Moneda2.png'
    ];

    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png'); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte
        this.x = Coin.lastCoinXPos + (100 + Math.random() * 365);
        Coin.lastCoinXPos = this.x;

        this.y = 70 + Math.random() * 145; //zahl zwischen 100 und 150

    }


}