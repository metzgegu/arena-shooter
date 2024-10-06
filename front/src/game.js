const velocity = 3;
const jumpVelocity = 5;
const gravity = 0.1;
const playerWidth = 20;
const platformList = [
  {
    x: 150,
    y: 100,
    width: 300,
    height: 10,
  },
  {
    x: 150,
    y: 150,
    width: 300,
    height: 10,
  },
  {
    x: 200,
    y: 400,
    width: 700,
    height: 10,
  },
  {
    x: 250,
    y: 300,
    width: 300,
    height: 10,
  },
  {
    x: 1000,
    y: 400,
    width: 300,
    height: 10,
  },
  {
    x: 300,
    y: 200,
    width: 600,
    height: 10,
  },
  {
    x: 400,
    y: 300 + 200,
    width: 400,
    height: 10,
  },
];

class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gamePaused = false;

    this.fireManager = new FireManager({ ctx, canvas });

    this.players = [];
  }

  setGamePaused(gamePaused) {
    this.gamePaused = gamePaused;
  }

  drawPlayer() {
    this.players.forEach((player) => player.draw());
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
    this.ctx.fillText(
      `${player.name} loose`,
      this.canvas.width / 2 - 50,
      this.canvas.height / 2,
    );
  }

  draw() {
    if (this.gamePaused) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const loosingPlayer = this.players.find((player) => player.loose);

    if (loosingPlayer) {
      this.displayLoose(loosingPlayer);
      return;
    }
    this.fireManager.draw();
    this.drawPlayer();

    platformList.forEach((platform) => {
      this.drawPlatform(
        platform.x,
        platform.y,
        platform.width,
        platform.height,
      );
    });
  }

  keyDownHandler(e) {
    if (this.gamePaused) return;

    this.players.forEach((player) => player.keyDownHandler(e));
  }

  keyUpHandler(e) {
    this.players.forEach((player) => player.keyUpHandler(e));
  }
}
