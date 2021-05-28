class PlayerLife {
    constructor(ctx) {
        this.ctx = ctx
        this.canvas = this.ctx.canvas

        this.img = new Image()
        this.img.src = 'https://shirley-gianina.github.io/Mad-Scientist/assets/User Interfaces/ProfileBar.png';
        this.img.isReady = false
        
        this.img.onload = () => {
        this.img.isReady = true
        }
        this.value = 250
    }

    isReady() {
        return (
            this.img.isReady
        )
    }

    draw() {
        if(this.isReady()) {
            this.ctx.drawImage (
                this.img,
                5,
                20,
                350,
                100,
            );

            this.ctx.beginPath();
            this.ctx.save();

            this.ctx.rotate(-0.3 * Math.PI / 180);
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(85, 26, 270, 42);

            this.ctx.fillStyle = "#ff3700";
            this.ctx.fillRect(95, 31, 250, 30);

            this.ctx.fillStyle = "#91c53e";
            this.ctx.fillRect(95, 31, this.value, 30);
            this.ctx.stroke();
            this.ctx.restore();

        }

    }

    move() {
        if (this.x + this.w <= 0) {
            this.x = 0;
        } else {
            this.x -= this.vy;
        }
    }

}