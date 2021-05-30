class Enemy {
    constructor(ctx, x, y, config) {
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;

        this.vx = config.vx;

        this.width = config.width;
        this.height = config.height

        this.attackLife = config.attackLife
        this.pos = {
            x: x, 
            y: y
        }

        this.life = new EnemyLife(this.ctx, this.pos)

        this.sprites = {
            walk: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                config.images.walk, 
                14, 1
            ),

            attacked: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                config.images.attacked,
                3, 1
            ),

            attack: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                config.images.attack,
                14, 1
            ),

        }

        this.sprite = this.sprites.walk

        this.sounds = {
            attack: new Audio(config.sounds.attack),
            attacked: new Audio(config.sounds.attacked)
        }
    }

    draw() {
        this.life.draw()
        this.sprite.draw()
        this.sprite.animate()
    }

    move() {
        this.pos.x -= this.vx;
    }

    isAlive() {
        return this.life.value > 0
    }


    attack() {
        this.sounds.attack.volume = 0.5
        this.sounds.attack.play()
        this.sprite = this.sprites.attack
    }

    attacked() {
        this.sounds.attacked.volume = 0.5
        this.sounds.attacked.play()
        this.sprite = this.sprites.attacked
        if(this.life.value > 0) {
            this.life.value -= this.attackLife
        }
    }

}