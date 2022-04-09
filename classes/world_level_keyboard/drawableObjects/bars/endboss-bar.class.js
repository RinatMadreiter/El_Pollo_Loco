class EndbossBar extends DrawableObject {

    /**
     * define EndbossBar variables
     */
    percentage = 100;


    /**define EndbossBar img array */
    IMAGES_HITPOINTSBAR = [
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/0.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/20.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/40.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/60.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/80.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/100.png'
    ]


    /**
     * load imgs, set: x,y,width and height and percentage for right bar img
     */
    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImages(this.IMAGES_HITPOINTSBAR);
        this.x = 490;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * adjust hitpointsbar img according to hitpoints
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HITPOINTSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
    * return 0-5 img depending on percentage number
    * @returns 0-5
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}