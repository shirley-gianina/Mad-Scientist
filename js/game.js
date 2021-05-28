
class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.canvas = this.ctx.canvas;

      this.gameInterval = null;
      this.scoreInterval = null;

      this.fps = 1000 / 150
      this.drawCount = 0;
      this.background = new Background(ctx)
      this.player = new Player(ctx)

      this.enemies = []
      this.potions = []

      this.seconds = 0

      this.sounds = {
        theme: new Audio('https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/music.wav'),
      }
    }

    start() {
      if (!this.scoreInterval) {
        this.scoreInterval = setInterval(() => {
          this.seconds += 1
          this.player.score.value = this.seconds;
          this.player.lifeScore = this.potions;

          if(this.seconds % 5  === 0) {
            this.enemies.push(
              new EnemyCharacter1(this.ctx, this.canvas.width),
              new EnemyCharacter2(this.ctx, this.canvas.width + 800),
              new EnemyCharacter3(this.ctx, this.canvas.width + 1200)
            )
          }
          if(this.seconds % 30 === 0) {
            this.potions.push( 
              new PotionLife(this.ctx, {x:  this.canvas.width, y: 200})
            )
          }
        }, 1000);
      }

      if (!this.gameInterval) {
        this.gameInterval = setInterval(() => {
          this.sounds.theme.autoplay = true
          this.sounds.theme.volume = 0.1;
          this.sounds.theme.play()
          this.clear()
          this.move()
          this.draw()
          this.checkLife()
          this.checkCollisions()
        }, this.fps)
      }

    }

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
      this.drawCount += 1
      this.background.draw();
      this.potions.forEach(potion => potion.draw())
      this.player.draw();
      this.enemies = this.enemies.filter((enemy) => enemy.isAlive())
      this.enemies.forEach((enemy) => enemy.draw())
    }

    move() {
      this.background.move()
      this.potions.forEach(potion => potion.move())
      this.enemies.forEach(enemy => enemy.move())
    }

    onKeyEvent(event) {
      const status = event.type === 'keydown'

      switch(event.keyCode) {
        case ARROW_UP:
            this.player.jump() 
            break;
        case SPACE:
          this.player.attack(status)
            break;
     }
    }

    gameOver() {
      this.sounds.theme.pause()
      this.background.paused = true
      this.player.die()

      setTimeout(() => {
        clearInterval(this.gameInterval)
        clearInterval(this.scoreInterval)

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.stroke();

        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 50px Courier";
        this.ctx.fillText("Game Over!", this.canvas.width / 2 - 140, this.canvas.height / 2 + 10 );
      }, 3000)
    }

    checkLife() {
      if (!this.player.hasLife()) {
        this.gameOver()
      }
    }

    checkCollisions() {
      const restPotions = this.potions.filter(potion => !collidesWith(this.player, potion))

      if (this.potions.length > restPotions.length) {
        this.player.getLife()
      }
  
      this.potions = restPotions

      let isAttacked = false

      for(let enemy of this.enemies) {
        if(this.player.isAttacking() && collidesWith(enemy, this.player.laser)) {
          enemy.attacked()
        }
        if(collidesWith(this.player, enemy)) {
          enemy.attack()
          isAttacked = true
        }
      }
      this.player.attacked(isAttacked)
    }

  }
