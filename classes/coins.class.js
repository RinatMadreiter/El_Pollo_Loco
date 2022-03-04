class Coins extends DrawableObject {


    height = 80;
    width = 80;
    IMAGE_COIN = [
        'img/8.Coin/Moneda1.png'
    ];

    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png'); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

        this.x = 250 + Math.random() * 1600; //zahl zwischen 200 und 700
        this.y = 100 + Math.random() * 100; //zahl zwischen 100 und 150


    }



}