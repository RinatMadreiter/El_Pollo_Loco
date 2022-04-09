class BackgroundObject extends MovableObject {

    /**
     * define BackgroundObject variables
     */
    width = 720;
    height = 500;


    /**
     * load img set x & y
     * @param {string} imagePath 
     * @param {number} x 
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }


}