class Player {
    constructor({ positionX, positionY, size, color, ctx }) {
        this.x = positionX;
        this.y = positionY;
        this.size = size;
        this.color = color;
        this.ctx = ctx;
        this.dx = 0;
        this.dy = 0;
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
}
