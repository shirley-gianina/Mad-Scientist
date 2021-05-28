class Sprite{
    constructor(ctx, pos, width, height, img, horizontalFrames, verticalFrames) {
        this.ctx = ctx

        this.pos = pos

        this.width = width
        this.height = height

        this.frameWidth = width
        this.frameHeight = height

        this.sprite = new Image()
        this.sprite.src = img
        this.sprite.isReady = false
        this.sprite.horizontalFrames = horizontalFrames
        this.sprite.verticalFrames = verticalFrames
        this.sprite.horizontalFrameIndex = 1
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 1

        this.sprite.onload = () => {
          this.sprite.isReady = true
          this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
          this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
          this.frameWidth = this.sprite.frameWidth 
          this.frameHeight = this.sprite.frameHeight
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if(this.isReady()) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.pos.x,
                this.pos.y,
                this.width,
                this.height
            )
        }
        this.sprite.drawCount++
    }

    animate() {
        if (this.sprite.verticalFrameIndex !== 0) {
            this.sprite.verticalFrameIndex = 0
            this.sprite.horizontalFrameIndex = 0
        } else if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
          if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
            this.sprite.horizontalFrameIndex = 0
          } else {
            this.sprite.horizontalFrameIndex++
          }
            this.sprite.drawCount = 0
        }
    }

    resetAnimation() {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 1
    }

}
