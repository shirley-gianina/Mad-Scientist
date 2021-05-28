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
        
        this.shooted = false;
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
            getLife: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/get_life.wav'),
            attacked: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/hit.wav')
        }

        this.isJumping = false

        this.laser = new Laser(ctx, this.pos)
        this.drawCount = 0;

        this.life = new PlayerLife(ctx)
        this.score = new PlayerScore(ctx)
        

    }

    drawCircle() {
        const center = calculateCenter(this)
        this.ctx.beginPath();
        this.ctx.arc(center.X, center.Y, 60, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.stroke();   
    }

    draw() {

        // this.drawCircle()

        this.drawCount += 1

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

    isAttacking() {
        return this.actions.attack
    }

    hasLife() {
        return this.life.value > 0
    }

    getLife() {
        this.sounds.getLife.play()
        this.life.value = 200
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

