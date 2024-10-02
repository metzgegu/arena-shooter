class Player {
    constructor({ name, positionX, positionY, size, color, ctx, jumpVelocity, velocity, gravity, canvas, fireManager }) {
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
        this.rightPressed = false;
        this.leftPressed = false;
        this.controls = {
            right: ["Right", "ArrowRight"],
            left: ["Left", "ArrowLeft"],
            up: ["Up", "ArrowUp"],
            down: ["Down", "ArrowDown"],
            fire: ["p"]
        }
        this.platformList = [];
        this.canvas = canvas;
        this.directionRight = true;
        this.fireManager = fireManager;
        this.name = name;
    }

    setPlatformList(platformList) {
        this.platformList = platformList;
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
        this.collisionWithFireCheck()
        this.collisionCheck();
        this.computeGravityVelocity(); // compute gravity velocity
        this.computePosition();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.fillText('🔫', this.x - 10, this.y + 15)
        this.ctx.font = "30px Georgia";
        this.ctx.closePath();
        this.computeDirection();
    }

    collisionWithFireCheck() {
        const firesTouchingMe = this.fireManager.getFireTouchingMe(this);

        if (firesTouchingMe) {
            this.fireManager.removeFire(firesTouchingMe);
            firesTouchingMe.directionRight ? this.setDx(2) : this.setDx(-2);
        }
    }

    collisionCheck() {
        if (this.y > this.canvas.offsetHeight - this.size) {
            this.loose = true;
        }

        const platform = this.platformList.find(platform => {
            if (this.x > platform.x && this.x < platform.x + platform.width && this.y >= platform.y - this.size && this.y < platform.y + 1 && this.dy >= 0) {
                if (!this.onGround) {         
                    this.setY(platform.y - this.size);
                    this.setDy(0)        
                }
                this.setOnGround(true);
                return true;
            }
        });

        if (!platform) {
            this.setOnGround(false);
        }
    }

    jump() {
        if (this.onGround) { // check if you're on the ground before jumping
            this.setDy(this.floatCalcul(-this.jumpVelocity)); // set y velocity to a negative number to jump up.
            this.setY(this.floatCalcul(this.y - 1)); // move the player up 1 pixel so they are no longer on the ground
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
            this.setDy(this.floatCalcul(this.dy + this.gravity))
        }
    }

    floatCalcul(number) {
        return Math.round(number * 1e2) / 1e2;
    }

    initControls({ right, left, up, down, fire }) {
        this.controls = {
            right,
            left,
            up,
            down,
            fire,
        }
    }

    computeDirection() {
        if (this.rightPressed) {
            this.setDx(velocity);
        } else if (this.leftPressed) {
            this.setDx(-velocity);
        } else {
            if (this.dx > 0) {
                this.setDx(Math.round((this.dx - 0.1) * 1e2) / 1e2);
            } else if (this.dx < 0) {
                this.setDx(Math.round((this.dx + 0.1) * 1e2) / 1e2);
            } else {
                this.setDx(0);
            }
        }
    }

    keyDownHandler(e) { 
        if (this.controls.right.includes(e.key)) {
            this.rightPressed = true;
            this.directionRight = true;
        } else if (this.controls.left.includes(e.key)) {
            this.leftPressed = true;
            this.directionRight = false;
        } else if (this.controls.up.includes(e.key)) {
            this.jump();
        } else if (this.controls.down.includes(e.key)) {
            this.down();
        } else if (this.controls.fire.includes(e.key)) {
            this.fireManager.fire({ x: this.x, y: this.y, directionRight: this.directionRight })
        }
    }

    keyUpHandler(e) {
        if (this.controls.right.includes(e.key)) {
            this.rightPressed = false;
        } else if (this.controls.left.includes(e.key)) {
            this.leftPressed = false;
        }
    }
}
