class EnemyCharacter1 extends Enemy {
    constructor(ctx, x) {
        super()

        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.interval = null;

        this.v = 3;

        this.width = 280;
        this.height = 280;

        this.pos = {
            x: x,
            y: this.canvas.height - 360
        }

        this.life = new EnemyLife(this.ctx, this.pos)

        this.sprites = {
            walk: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character1/Walk/spritesheet.png',
                14, 1
            ),

            attacked: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character1/Get Electric/spritesheet.png',
                3, 1
            ),

            attack: new Sprite(
                this.ctx,
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character1/Hit/spritesheet.png',
                14, 1
            ),

        }
        

        this.sprite = this.sprites.walk

        this.sounds = {
            attack: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/hit.wav'),
            attacked: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/enemy/death_02.wav')
        }


    }

    attacked() {
        this.sounds.attacked.volume = 0.5
        this.sounds.attacked.play()
        this.sprite = this.sprites.attacked
        if(this.life.value > 0) {
            this.life.value -= 2
        }
    }

}