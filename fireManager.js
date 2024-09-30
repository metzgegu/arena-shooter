class FireManager {
    constructor({ ctx, canvas }) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.fireList = [];
    }

    draw() {
        this.fireList.forEach(fire => {
            this.ctx.beginPath();
            this.ctx.arc(fire.x, fire.y, 5, 0, Math.PI * 2);
            fire.directionRight ? fire.x += 10 : fire.x -= 10;
            this.ctx.fillStyle = "red";
            this.ctx.fill();
        });
    }

    fire({ x, y, directionRight }) {
        this.fireList.push({ x, y, directionRight });
    }
}