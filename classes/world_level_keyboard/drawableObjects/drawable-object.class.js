class DrawableObject {
    /**
     * define DrawableObject variables
     */
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 150;
    width = 100;


    /**
     * load path of img
     * @param {Pointer}  path of the imgs
     */
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image') <img id="image"> /das Objekt Image ist bereits vorgegeben in JS
        this.img.src = path;
    }


    /**
     * drawFrame for testing if needed currently not used
     * @param {canvas} ctx canvas HTML element
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof EndbossTinyChicken) { //wird nur bei Character, Chicken und Endboss angezeigt
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * loadImages from given IMG-array 
     * @param {Array} arr  ['img/image1.png, 'img/image2.png', ...]
     */
       loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * draw img on canvas used in @function addToMap in @file "classes/world_level_keyboard/world.class.js"
     * @param {canvas} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // eine vorgegebene Funktion welche Bilder auf das Canvas zeichnet / circa 25 mal pro Sekunde ausgeführt
        } catch (error) {
        console.warn('Error loading Img ', error);
        console.log('could not load image ', this.img.src);  
        }
    }

}