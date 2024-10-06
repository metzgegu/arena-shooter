class Menu {
    constructor({ menu, gameCanvas, gameMenu, gameContext, document }) {
        this.menu = menu
        this.gameCanvas = gameCanvas
        this.gameContext = gameContext
        this.document = document
        this.gameMenu = gameMenu
        this.gameMenuOpen = false

        this.document.addEventListener("keydown", (e) => this.onKeydown(e), false);
        this.document.addEventListener("keyup", (e) => this.onKeyUp(e), false);

        this.document.getElementById("menu__action__single-game").addEventListener("click", () => {
            this.setUpSinglePlayerGame();
        });

        this.document.getElementById("game__menu__action__resume").addEventListener("click", () => {
            this.onGamePause()
        })

        this.document.getElementById("game__menu__action__quit").addEventListener("click", () => {
            this.gameCanvas.style.display = "none";
            this.menu.style.display = "block";
            this.gameMenu.style.display = "none";
            this.gameMenuOpen = false;
            clearInterval(this.gameId);
        })

        this.document.getElementById("game__menu__action__restart").addEventListener("click", () => {
            this.game.restart();
            this.gameMenu.style.display = "none";
            this.gameMenuOpen = false;
            this.game.setGamePaused(false);
        })
    }

    onKeydown(e) {
        if (this.game) {
            this.game.keyDownHandler(e);
            this.onGamePaused(e)
        }
    }

    onKeyUp(e) {
        if (this.game) {
            this.game.keyUpHandler(e);
        }
    }

    onGamePause() {
        if (this.gameMenuOpen === false) {
            this.gameMenu.style.display = "block";
            this.gameMenuOpen = true;
            this.game.setGamePaused(true);
        } else {
            this.gameMenu.style.display = "none";
            this.gameMenuOpen = false;
            this.game.setGamePaused(false);
        }
    }

    setUpSinglePlayerGame() {
        this.menu.style.display = "none";
        this.gameCanvas.style.display = "block";
        this.game = new SinglePlayerGame({ ctx: this.gameContext, canvas: this.gameCanvas });
        if (this.gameId) clearInterval(this.gameId);
        this.gameId = setInterval(() => this.game.draw(), 10);
    }

    onGamePaused(e) {
        if (e.key === "Escape") {
            this.onGamePause();
        }
    }
}