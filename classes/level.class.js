class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2260;

    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) { //constructor wird am Anfang aufgerufen, bei Erstellung
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }


}