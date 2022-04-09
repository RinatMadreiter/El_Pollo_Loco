class Bottle extends DrawableObject {

    /**
     * define Bottle variables
     */
    height = 70;
    width = 15;
    static lastBottleXPos = 200;


    /**
     * define bottle img array
     */
    IMAGE_BOTTLE = [
        'img/6.botella/1.Marcador.png'
    ];


    /**
     * load img, randomize x and y- position of bottles, keep them apart from each other
     */
    constructor() {
        super().loadImage(this.IMAGE_BOTTLE); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

        this.x = Bottle.lastBottleXPos + (20 + Math.random() * 280); //100 + Math.random() * 380
        Bottle.lastBottleXPos = this.x;
        
        this.y = 340; /*  200 + Math.random() * 100;  *///zahl zwischen 100 und 150

    }



}