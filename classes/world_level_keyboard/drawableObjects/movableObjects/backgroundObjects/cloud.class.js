class Cloud extends MovableObject {
    /**
     * define Cloud variables
     */
    y = 20;
    width = 500;
    height = 250;
    static lastCloudXPos = 400;


    /**
     * load img
     * randomize x position of clouds
     * animate
     */
    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png'); //super wird nur benötigt wenn man auf Methoden/funktionen zugreifen möchte

        this.x = Cloud.lastCloudXPos + (200 + Math.random() * 2600);
        Coin.lastCloudXPos = this.x;
        this.animate();
    }


    /**
     * move clouds left
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 17);
    }



}
