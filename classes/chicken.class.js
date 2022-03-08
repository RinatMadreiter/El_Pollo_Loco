class Chicken extends MovableObject{
    height = 80;
    width = 60;
    y = 345;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    currentImage = 0;
    
constructor() {
    super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png'); //super wird nur benötigt wenn man auf Methoden/Funktionen zugreifen möchte

    this.x = 200 + Math.random() * 500; //zahl zwischen 200 und 700
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.15 + Math.random() * 0.7; //Zahl zwischen 0.15 und 0.65 

    this.animate();
}


animate() {
    setInterval(() => {  
        this.otherDirection = false;  
        this.moveLeft();
    }, 17);

    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
}


}