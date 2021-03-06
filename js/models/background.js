class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.canvas = this.ctx.canvas

        this.w = this.canvas.width * 48

        this.x = 0
        this.y = 0

        this.vx = 2;


        this.backgroundImg = new Image()
        this.backgroundImg.src = 'https://shirley-gianina.github.io/Mad-Scientist/assets/Backgrounds/spritesheet.png';
        this.backgroundImg.isReady = false
        this.backgroundImg.onload = () => {
          this.backgroundImg.isReady = true
        }

        this.paused = false
  
    }

    isReady() {
        return (
            this.backgroundImg.isReady
        )
    }


    draw() {
        if(this.isReady()) {
            this.ctx.drawImage (
                this.backgroundImg,
                this.x,
                this.y,
                this.w,
                this.canvas.height
            );
        
            this.ctx.drawImage (
                this.backgroundImg,
                this.x + this.w,
                this.y,
                this.w,
                this.canvas.height
            );
        } 

    }

    move() {
        if(!this.paused) {
            if (this.x + this.w <= 0) {
                this.x = 0;
            } else {
                this.x -= this.vx;
            }
        }
    }
}