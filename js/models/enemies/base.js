class Enemy {

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
        this.life.draw()
        this.sprite.draw()
        this.sprite.animate()
    }

    move() {
        this.pos.x -= this.v;
    }

    isAlive() {
        return this.life.value > 0
    }


    attack() {
        this.sounds.attack.volume = 0.5
        this.sounds.attack.play()
        this.sprite = this.sprites.attack
    }
    
}