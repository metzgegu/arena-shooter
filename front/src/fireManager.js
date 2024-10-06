class FireManager {
    constructor({ ctx, canvas }) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.fireList = [];
        this.fireVelocity = 10
    }

    reset() {
        this.fireList = [];
    }

    draw() {
        this.fireList.forEach(fire => {
            this.ctx.beginPath();
            this.ctx.arc(fire.x, fire.y, 5, 0, Math.PI * 2);
            fire.directionRight ? fire.x += this.fireVelocity : fire.x -= this.fireVelocity;
            this.ctx.fillStyle = "red";
            this.ctx.fill();
        });
    }

    fire({ x, y, directionRight }) {
        this.fireList.push({ x, y, directionRight });
    }

    removeFire(fire) {
        this.fireList = this.fireList.filter(f => f !== fire);
    }

    getFireTouchingMe(player) {
        return this.fireList.find(fire => {
            return fire.x > player.x - player.size / 2 && fire.x < player.x + player.size / 2 && fire.y > player.y - player.size && fire.y < player.y + player.size;
        });
    }
}