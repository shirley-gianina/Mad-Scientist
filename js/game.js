
class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.canvas = this.ctx.canvas;

      this.gameInterval = null;
      this.scoreInterval = null;

      this.fps = 1000 / 150
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

      this.scoreInterval = setInterval(() => {
        this.seconds += 1 // contamos los segundos
        this.player.score.value = this.seconds;
        
        // cada 5 seg
        if(this.seconds % 5  === 0) {
          this.enemies.push(
            new Enemy(this.ctx, random(this.canvas.width, this.canvas.width * 2), this.canvas.height - 360, ENEMY_1_CONFIG),
            new Enemy(this.ctx, random(this.canvas.width, this.canvas.width * 2), this.canvas.height - 360, ENEMY_2_CONFIG),
            new Enemy(this.ctx, random(this.canvas.width, this.canvas.width * 2), this.canvas.height - 360, ENEMY_3_CONFIG),
          )
        }
        // cada 50 seg
        if(this.seconds % 50 === 0) {
          this.potions.push( 
            new PotionLife(this.ctx, {x:  this.canvas.width, y: 200})
          )
        }
      }, 1000);

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

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
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
          // en el caso que pulsa la tecla, ataca 
          // en caso contrario deja de atacar.  
          this.player.attack(status)
            break;
     }
    }

    gameOver() {
      this.sounds.theme.pause()
      this.background.paused = true
      this.player.die()

      setTimeout(() => {
        // paramos los intervalos solo despues de 3s
        // para que se pueda la animacion completa de cuando
        // muere el player.
        clearInterval(this.gameInterval)
        clearInterval(this.scoreInterval)

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.stroke();

        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 150px Combo";
        this.ctx.fillText(`Score: ${this.player.score.value}`, this.canvas.width / 2 - 240, this.canvas.height / 2 + 70 );

      }, 3000)
    }

    checkLife() {
      // si el player no tiene vida el juego ha terminado
      if (!this.player.isAlive()) {
        this.gameOver()
      }
    }

    checkCollisions() {
      
      const collidedWithPotion = this.potions.some((potion) => collidesWith(this.player, potion));

      if(collidedWithPotion === true) {
        this.player.addLife()
        this.potions = this.potions.filter(potion => !collidesWith(this.player, potion))
      }
  
      let attackedStatus = false

      for(let enemy of this.enemies) {
        // si el player esta atacando y algun enemigo ha sido disparado con el laser
        if(this.player.isAttacking() && collidesWith(enemy, this.player.laser)) {
          enemy.attacked()
        }
        // si algun enemigo choca con el player
        if(collidesWith(this.player, enemy)) {
          enemy.attack()
          attackedStatus = true
        }
      }

      // deja de ser atacado en el caso que el status es false
      this.player.attacked(attackedStatus)

    }

  }
