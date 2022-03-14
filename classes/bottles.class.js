class Bottle extends DrawableObject {


    height = 70;
    width = 15;
    static lastBottleXPos = 250;

    IMAGE_BOTTLE = [
        'img/6.botella/1.Marcador.png'
    ];

    constructor() {
        super().loadImage(this.IMAGE_BOTTLE); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

        this.x = Bottle.lastBottleXPos + (100 + Math.random() * 380);
        Bottle.lastBottleXPos = this.x;
        
        this.y = 340; /*  200 + Math.random() * 100;  *///zahl zwischen 100 und 150

    }



}