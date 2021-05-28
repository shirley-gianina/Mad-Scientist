class EnemyCharacter3 extends Enemy {
    constructor(ctx, x) {
        super()
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.interval = null;

        this.v = 2;

        this.width = 280;
        this.height = 280;

        this.pos = {
            x: x,
            y: this.canvas.height - 350
        }

        this.life = new EnemyLife(
            this.ctx,
            this.pos
        )

        this.move()

        this.sprites = {
            walk: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character3/Walk/spritesheet.png',
                14, 1
            ),

            attacked: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character3/Get Electric/spritesheet.png',
                3, 1
            ),

            attack: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character3/Hit/spritesheet.png',
                14, 1
            ),

        }

        this.sprite = this.sprites.walk

        this.sounds = {
            attack: new Audio('https://shirley-gianina.github.io/assets/Sounds/player/hit.wav'),
            attacked: new Audio('https://shirley-gianina.github.io/assets/Sounds/enemy/death_05.wav')
        }

    }

    attacked() {
        this.sounds.attacked.volume = 0.5
        this.sounds.attacked.play()
        this.sprite = this.sprites.attacked
        if(this.life.value > 0) {
            this.life.value -= 0.8
        }
    }

}