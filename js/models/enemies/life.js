class EnemyLife {
    constructor(ctx, enemyPos) {
        this.ctx = ctx

        this.canvas = this.ctx.canvas

        this.enemyPos = enemyPos

        this.value =  100
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(this.enemyPos.x + 80, this.enemyPos.y + 40, 104, 14);
        this.ctx.stroke();

        this.ctx.beginPath()
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.enemyPos.x + 82, this.enemyPos.y + 42, this.value, 10);
        this.ctx.stroke();
    }
}