class PlayerScore {
    constructor(ctx) {
        this.ctx = ctx
        this.canvas = this.ctx.canvas

        this.value = 0;

        this.imgScore = new Image()
        this.imgScore.src = 'https://shirley-gianina.github.io/Mad-Scientist/assets/User Interfaces/AchievmentBadges.png';
        this.imgScore.isReady = false
        this.imgScore.onload = () => {
            this.imgScore.isReady = true
        }

        this.imgBox = new Image()
        this.imgBox.src = 'https://shirley-gianina.github.io/Mad-Scientist/assets/User Interfaces/EmptyBox.png';
        this.imgBox.isReady = false
        this.imgBox.onload = () => {
            this.imgBox.isReady = true
        }

    }

    isReady() {
        return (
            this.imgScore.isReady &&
            this.imgBox.isReady
        )
    }

    draw() {
        if(this.isReady()) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.canvas.width - 180, 23, 172, 36)
            this.ctx.stroke();

            this.ctx.fillStyle = "white";
            this.ctx.fillRect(this.canvas.width - 184, 28, 170, 26)
            this.ctx.stroke();


            this.ctx.drawImage (
                this.imgScore,
                this.canvas.width - 200,
                16,
                54,
                60
            );
            this.ctx.fillStyle = "black";  
            this.ctx.font = "bold 24px Courier";
            this.ctx.fillText(`${this.value} M`, this.canvas.width - 118, 49);
        } 

    }

}