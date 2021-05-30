class Laser {
    constructor(ctx, playerPos) {
        this.ctx = ctx

        this.canvas = this.ctx.canvas

        this.playerPos = playerPos
        this.pos = {
            x: 0,
            y: 0
        }

        this.width = 200
        this.height = 50
        this.sprite = new Sprite(
            this.ctx, 
            this.pos,
            this.width, this.height,
            'https://shirley-gianina.github.io/Mad-Scientist/assets/Weapon/spritesheet.png', 
            5, 1
        )
    
    }

    draw() {

        this.pos.x = this.playerPos.x + 200,
        this.pos.y = this.playerPos.y + 90
        
        this.sprite.draw()
        this.sprite.animate()
    }

}