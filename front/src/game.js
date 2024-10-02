class Game {
    constructor({ canvas, ctx,}) {
        this.canvas = canvas
        this.ctx = ctx

        this.fireManager = new FireManager({ ctx, canvas });

        this.player = new Player({ name: 'Player Blue', positionX: this.canvas.width / 2, positionY: 0, size: playerWidth, color: "#0095DD", ctx: this.ctx, jumpVelocity, velocity, gravity, canvas: this.canvas, fireManager: this.fireManager });
        this.player.setPlatformList(platformList);
        this.player2 = new Player({ name: 'Player Red', positionX: this.canvas.width / 4, positionY: 0, size: playerWidth, color: "red", ctx: this.ctx, jumpVelocity, velocity, gravity, canvas: this.canvas, fireManager: this.fireManager });
        this.player2.setPlatformList(platformList);
        this.player2.initControls({
            right: ["d"],
            left: ["q"],
            up: ["z"],
            down: ["s"],
            fire: ["c"]
        });

        this.players = [this.player, this.player2];
    }
    
    drawPlayer() {
        this.players.forEach(player => player.draw());
    }

    drawPlatform(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = "#000000";
        this.ctx.fill();
        this.ctx.closePath();
    }

    floatCalcul(number) {
        return Math.round(number * 1e2) / 1e2;
    }

    displayLoose(player) {
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${player.name} loose`, this.canvas.width / 2 - 50, this.canvas.height / 2);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const loosingPlayer = this.players.find(player => player.loose)

        if (loosingPlayer) {
            this.displayLoose(loosingPlayer);
            return;
        }
        this.fireManager.draw()
        this.drawPlayer();
        
        platformList.forEach(platform => {
            this.drawPlatform(platform.x, platform.y, platform.width, platform.height);
        });
    }

    keyDownHandler(e) {
        this.players.forEach(player => player.keyDownHandler(e));
    }

    keyUpHandler(e) {
        this.players.forEach(player => player.keyUpHandler(e));
    }
}