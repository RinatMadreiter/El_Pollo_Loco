class Bottle extends DrawableObject {


    height = 70;
    width = 15;
    IMAGE_BOTTLE = [
        'img/6.botella/1.Marcador.png'
    ];

    constructor() {
        super().loadImage(this.IMAGE_BOTTLE); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

        this.x = 250 + Math.random() * 1600; //zahl zwischen 200 und 700
        this.y = 100 + Math.random() * 100; //zahl zwischen 100 und 150

    }



}