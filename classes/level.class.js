class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    level_end_x = 2260;

    constructor(enemies, clouds, backgroundObjects, coins) { //constructor wird am Anfang aufgerufen, bei Erstellung
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }


}