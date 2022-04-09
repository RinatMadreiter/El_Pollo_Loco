class Level {

    /**
     * define all relevant variables for Level class used in @function initLevel1() in @file levels/level1.js
     */
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 3700; // 2260


    /**
     * define relevant parameters to be set in @function initLevel1() in @file levels/level1.js
     * @param {array} enemies 
     * @param {array} endboss 
     * @param {array} clouds 
     * @param {array} backgroundObjects 
     * @param {array} coins 
     * @param {array} bottles 
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) { //constructor wird am Anfang aufgerufen, bei Erstellung
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }


}