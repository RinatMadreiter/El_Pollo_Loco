class EndbossTinyChicken extends MovableObject {


    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/walking1.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/walking2.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/walking3.png'
    ];

    IMAGE_DEAD = ['img/3.Secuencias_Enemy_básico/Versión_pollito/dead.png'];

    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
    }



}


