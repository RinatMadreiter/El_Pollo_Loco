class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    hadContactWithEndboss = false;
    energy = 50;
    endbossGettingHit = false;

    IMAGES_ALERT = [
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G5.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G6.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G7.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G8.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G9.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G10.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G11.png',
        'img/4.Endboss/2.attacking_endboss/1.Alerta/G12.png'
    ];

    IMAGES_ARRIVING = [
        'img/4.Endboss/1.Caminata/G1.png',
        'img/4.Endboss/1.Caminata/G2.png',
        'img/4.Endboss/1.Caminata/G3.png',
        'img/4.Endboss/1.Caminata/G4.png'
    ];

    IMAGES_ATTACKING = [
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G13.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G14.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G15.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G16.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G17.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G18.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G19.png',
        'img/4.Endboss/2.attacking_endboss/2.Ataque/G20.png'
    ];

    IMAGES_HURT = [
        'img/4.Endboss/3.Herida/G21.png',
        'img/4.Endboss/3.Herida/G22.png',
        'img/4.Endboss/3.Herida/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4.Endboss/4.Muerte/G24.png',
        'img/4.Endboss/4.Muerte/G25.png',
        'img/4.Endboss/4.Muerte/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]); //super wird nur benötigt wenn man auf Methoden/funktionen zugreifen möchte
        this.loadImages(this.IMAGES_ARRIVING);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2500;
        this.animate();

    }


    animate() {
        let i = 0;

        // setTimeout(() => {

            setInterval(() => {

                if (i < 10) {
                    this.playAnimation(this.IMAGES_ARRIVING);
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }

                i++;

                if (world.character.x > 2000 && !this.hadContactWithEndboss) {
                    i = 0;
                    this.hadContactWithEndboss = true;
                }
            }, 200);

        // }, 6000); // jetzt noch auf 6 Sekunden weil die zweite If Abfrage noch nicht funktioniert
    }

}