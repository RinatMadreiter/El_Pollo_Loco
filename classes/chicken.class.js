class Chicken extends MovableObject {
    height = 80;
    width = 60;
    y = 345;
    energy = 4;
    intervalAnimation = 200;

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    IMAGE_DEAD = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png'); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

        this.x = 800 + Math.random() * 500; //zahl zwischen 200 und 700 //this.x = 200 + Math.random() * 500
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.speed = 0.15 + Math.random() * 0.7; //Zahl zwischen 0.15 und 0.65 

        this.animate();
    }


    animate() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD);
        } else {

            setInterval(() => {
                this.otherDirection = false;
                this.moveLeft();
            }, 17);

            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 200);
        }
    }


    //vom liveCall
    animate() {
        let moveInterval = setInterval(() => {
            if (!this.isDead()) {
                this.otherDirection = false;
                this.moveLeft();
            } else {
                //ToDo
                clearInterval(moveInterval);
            }
        }, 17);

        let playInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGE_DEAD);
                setTimeout(() => {
                    clearInterval(playInterval);
                }, this.IMAGE_DEAD.length * this.intervalAnimation)
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, this.intervalAnimation);
    }





}