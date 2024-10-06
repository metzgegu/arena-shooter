class SinglePlayerGame extends Game {
    constructor({ canvas, ctx }) {
        super({ canvas, ctx });

        this.start();
    }

    start() {
        this.player = new Player({ name: 'Player Blue', positionX: this.canvas.width / 2, positionY: 0, size: playerWidth, color: "#0095DD", ctx: this.ctx, canvas: this.canvas });
        this.player.setGameConfig({ jumpVelocity, velocity, gravity });
        this.player.setPlatformList(platformList);
        this.player.setFireManager(this.fireManager);
        this.player2 = new Player({ name: 'Player Red', positionX: this.canvas.width / 4, positionY: 0, size: playerWidth, color: "red", ctx: this.ctx, canvas: this.canvas });
        this.player2.setPlatformList(platformList);
        this.player2.setFireManager(this.fireManager);
        this.player2.setGameConfig({ jumpVelocity, velocity, gravity });
        this.player2.initControls({
            right: ["d"],
            left: ["q"],
            up: ["z"],
            down: ["s"],
            fire: ["c"]
        });

        this.players = [this.player, this.player2];
    }

    restart() {
        this.fireManager.reset();
        this.start();
    }
}