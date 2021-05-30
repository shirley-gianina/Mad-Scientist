class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;

        this.vy = 0;
        this.vx = 0;

        this.width = 200;
        this.height = 180;

        this.pos = {
            x: 0,
            y: this.canvas.height - 280
        }

        this.bottomY = this.pos.y;
        this.topY = 20;

        this.actions = {
            walk: true,
            jump: false,
            attack: false, 
            attacked: false,
            die: false,
        }

        this.sprites = {
            walk: new Sprite(
                this.ctx, 
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Player/Walk/spritesheet.png', 
                14, 1
            ),
            attack : new Sprite(
                this.ctx, 
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Player/Walk/spritesheet.png', 
                14, 1
            ),
            attacked : new Sprite(
                this.ctx, 
                this.pos,
                this.width, this.height,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Player/Get Hit/spritesheet.png', 
                10, 1
            ),
            die : new Sprite(
                this.ctx, 
                this.pos,
                230, 230,
                'https://shirley-gianina.github.io/Mad-Scientist/assets/Player/Death/spritesheet.png', 
                44, 1
            ),
        }

        this.sprite = this.sprites.getHit

        this.sounds = {
            jump: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/jump.wav'),
            attack: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/shoot.wav'),
            die: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/losing.wav'),
            life: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/get_life.wav'),
            attacked: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/hit.wav')
        }

        this.isJumping = false

        this.laser = new Laser(ctx, this.pos)
        this.life = new PlayerLife(ctx)
        this.score = new PlayerScore(ctx)
    }

    draw() {

        if(this.actions.jump === true) {
            this.pos.y += this.vy

            if (!this.isJumping) {
                this.isJumping = true
                this.vy = -3
            } else if (this.pos.y <= this.topY) {
                this.vy = +2
            } else if (this.pos.y >= this.bottomY) {
                this.actions.jump = false;
                this.isJumping = false;
                this.pos.y = this.bottomY;
                this.vy = 0
            }
        }

        if (this.actions.attack === true) {
            this.laser.draw()
            this.sprite = this.sprites.attack
        } 

        if (this.actions.walk === true) {
            this.sprite = this.sprites.walk
        }

        if (this.actions.die === true) {
            this.sprite = this.sprites.die
            this.actions.die = false
        } else if(this.actions.attacked === true) {
            this.sprite = this.sprites.attacked
            if(this.life.value >= 0) { 
                this.life.value -= 0.2 
            }
        }
        
        this.sprite.draw()
        this.sprite.animate()
        this.life.draw()
        this.score.draw()
    }


    isAttacking() {
        return this.actions.attack
    }

    isAlive() {
        return this.life.value > 0
    }

    addLife() {
        this.sounds.life.play()

        if(this.life.value <= PLAYER_MAX_LIFE - POTION_LIFE) {
            this.life.value += POTION_LIFE
        }
    }

    attack(status) {
        this.sounds.attack.volume = 0.9
        this.sounds.attack.play()
        this.actions.attack = status
        this.actions.walk = !status
    }

    attacked(status) {
        this.actions.attacked = status
        this.actions.walk = !status
    }

    die() {
        this.sounds.die.play()
        this.actions.die = true
        this.actions.walk = false
        this.actions.jump = false
        this.actions.attack = false
        this.actions.attacked = false
    }

    jump() {
        this.sounds.jump.play()
        this.actions.jump = true
    }

}

