class Player {
    constructor({ positionX, positionY, size, color, ctx, jumpVelocity, velocity, gravity }) {
        this.x = positionX;
        this.y = positionY;
        this.size = size;
        this.color = color;
        this.ctx = ctx;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
        this.jumpVelocity = jumpVelocity;
        this.velocity = velocity;
        this.gravity = gravity;
    }

    setOnGround(onGround) {
        this.onGround = onGround;
    }

    setDx(dx) {
        this.dx = dx;
    }

    setDy(dy) {
        this.dy = dy;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, playerWidth, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    jump() {
        if (this.onGround) { // check if you're on the ground before jumping
            this.setDy(floatCalcul(-this.jumpVelocity)); // set y velocity to a negative number to jump up.
            this.setY(floatCalcul(this.y - 1)); // move the player up 1 pixel so they are no longer on the ground
            this.setOnGround(false); // make so you cant jump again mid-air
        }
    }

    down() {
        if (this.onGround) {
            this.setY(this.y + 5);
            this.setDy(1);
        }
    }

    computePosition() {
        this.setX(this.x + this.dx);
        this.setY(this.y + this.dy);
    }

    computeGravityVelocity() {
        if (!this.onGround) {
            this.setDy(floatCalcul(this.dy + this.gravity))
        }
    }

    floatCalcul(number) {
        return Math.round(number * 1e2) / 1e2;
    }
}
