class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    static lastCloudXPos = 400;


    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png'); //super wird nur benötigt wenn man auf Methoden/funktionen zugreifen möchte

        this.x = Cloud.lastCloudXPos + (200 + Math.random() * 2600);
        Coin.lastCloudXPos = this.x;

        // this.x = 200 + Math.random() * 1500; // zufällig generierte Zahl zwischen 0 und 700 
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 17);
    }



}
