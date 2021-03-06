class CoinBar extends DrawableObject {
    
    /**
     * define CoinBar variables
     */
    amountOfCoins = 0;


    /**
     * define CoinBar img array
     */
    IMAGES_COINS = [
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/0.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/20.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/40.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/60.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/80.png',
        'img/7.Marcadores/Barra/Marcador_moneda/Verde/100.png'
    ]


    /**
     * load imgs, set x, y, width and height, update coinbar
     */
    constructor() {
        super(); //benötigt um auf Methoden der höheren Classes zugreifen zu können
        this.loadImages(this.IMAGES_COINS);
        this.x = 490;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.updateCoinBar(0);
    }


    /**
     * amountOfCoins += 1;
     */
    collectCoins() {
            this.amountOfCoins += 1;
    }


    /**
     * adjust bar img according to the amount of coins
     * @param {number} amountOfCoins 
     */
    updateCoinBar(amountOfCoins) {
        this.amountOfCoins = amountOfCoins;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


     /**
     *  return 0-5 img depending on percentage number
     * @returns 0-5
     */
    resolveImageIndex() {
        if (this.amountOfCoins == 0) {
            return 0;
        } else if (this.amountOfCoins == 1 || this.amountOfCoins == 2 || this.amountOfCoins == 3) {
            return 1;
        } else if (this.amountOfCoins == 4 || this.amountOfCoins == 5 ) {
            return 2;
        } else if (this.amountOfCoins == 6 || this.amountOfCoins == 7) {
            return 3;
        } else if (this.amountOfCoins == 8 || this.amountOfCoins == 9) {
            return 4;
        } else if (this.amountOfCoins >= 10) {
            return 5;
        }
    }
}