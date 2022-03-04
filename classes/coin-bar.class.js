class CoinBar extends DrawableObject{

    IMAGES_COINS = [
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/0.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/20.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/40.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/60.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/80.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/100.png'
    ]

amountOfCoins = 0;


    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImages(this.IMAGES_COINS);
        this.x = 460;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setAmountOfCoins(0);
    }

    

    setAmountOfCoins(amountOfCoins) {
        this.amountOfCoins = amountOfCoins;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];   
    }

    resolveImageIndex(){
        if (this.amountOfCoins == 0) {
            return 0;
        } else if (this.amountOfCoins >= 2) {
            return 1;
        } else if (this.amountOfCoins >= 4) {
            return 2;
        } else if (this.amountOfCoins >= 6) {
            return 3;
        } else if (this.amountOfCoins >= 8) {
            return 4;
        } else if (this.amountOfCoins == 10) {
            return 5;
        } 
    }
}