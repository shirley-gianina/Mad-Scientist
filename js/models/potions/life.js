class PotionLife {
    constructor(ctx, pos) {
        this.ctx = ctx

        this.canvas = this.ctx.canvas
        this.pos = pos

        this.width = 50
        this.height = 50

        this.sprite = new Sprite(
            this.ctx, 
            this.pos,
            this.width, this.height,
            'https://shirley-gianina.github.io/Mad-Scientist/assets/User Interfaces/potion1.png',
            1, 1
        )

    }

    draw() {
        this.sprite.draw()
        this.sprite.animate() 
    }

    move() {
        this.pos.x -= 2 
    }
}