class EndbossBar extends DrawableObject {

    percentage = 100;

    IMAGES_HITPOINTSBAR = [
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/0.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/20.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/40.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/60.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/80.png',
        'img/7.Marcadores/Barra/MarcadorVida/Naranja/100.png'
    ]

    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImages(this.IMAGES_HITPOINTSBAR);
        this.x = 490;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HITPOINTSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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