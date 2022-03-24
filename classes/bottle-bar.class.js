class BottleBar extends DrawableObject {

    amountOfBottles = 0;

    IMAGES_BOTTLES = [
        'img/7.Marcadores/Barra/Marcador_botella/Verde/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/100_.png'
    ]

    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 260;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.updateBottleBar(0);
    }

    
    collectBottles() {
        this.amountOfBottles += 1;
    }


    updateBottleBar(amountOfBottles) {
        this.amountOfBottles = amountOfBottles;
        let path = this.IMAGES_BOTTLES[this.resolveBottleIndex()];
        this.img = this.imageCache[path];
    }


    resolveBottleIndex() {
        if (this.amountOfBottles == 0) {
            return 0;
        } else if (this.amountOfBottles == 1 || this.amountOfBottles == 2 || this.amountOfBottles == 3) {
            return 1;
        } else if (this.amountOfBottles == 4 || this.amountOfBottles == 5 || this.amountOfBottles == 6) {
            return 2;
        } else if (this.amountOfBottles == 7 || this.amountOfBottles == 8 || this.amountOfBottles == 9) {
            return 3;
        } else if (this.amountOfBottles == 10 || this.amountOfBottles == 11 || this.amountOfBottles == 12) {
            return 4;
        } else if (this.amountOfBottles == 13 || this.amountOfBottles == 14 || this.amountOfBottles == 15) {
            return 5;
        }
    }

} 