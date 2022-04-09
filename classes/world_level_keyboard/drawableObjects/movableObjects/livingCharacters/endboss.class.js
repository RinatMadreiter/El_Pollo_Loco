class Endboss extends MovableObject {


    /**
     * define endboss class variables
     */
    height = 400;
    width = 250;
    y = 50;
    hadContactWithEndboss = false;
    energy = 100;
    speed = 15;
    x = 2800;


    /**
     * define endboss IMG-arrays:
     * alert, arriving, attacking, hurt and dead 
     */
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



    /**
     * load images and animate
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);  //super wird nur benötigt wenn man auf Methoden/funktionen zugreifen möchte
        this.loadImages(this.IMAGES_ARRIVING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
    }


    /**
     * animate according to condition
     * interval 200ms
     * 
     */
    animate() {

        let i = 0;
        setInterval(() => {

            if (i < 10) {
                this.playAnimation(this.IMAGES_ARRIVING);
                this.moveLeft();
            }

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT); 
                setTimeout(() => {
                    this.moveRight();
                    this.endbossHurt = true;
                }, 500);

            }


            if (this.energy == 10 && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT); 
                setTimeout(() => {
                    this.speed = 50;
                    this.moveRight();
                    this.endbossHurt = true;
                }, 500);
            }


            if (this.energy == 10 && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_ATTACKING);
            }

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }

            if (!this.isDead() && !this.isHurt() && this.energy > 10) {
                this.playAnimation(this.IMAGES_ALERT);
            }

            i++;

            if (world.character.x > 2000 && !this.hadContactWithEndboss) {
                i = 0;
                this.hadContactWithEndboss = true;
            }

        }, 200);

    }


}