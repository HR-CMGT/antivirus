class Background {
    constructor(backLayerImage, frontLayerImage, animation) {
        this.createBackground();
        this.backLayer(backLayerImage);
        this.midLayer();
        this.animation = animation;
        this.frontLayer(frontLayerImage, this.animation);
    }
    createBackground() {
        var background = document.createElement("background");
        background.setAttribute("id", "background");
        document.body.appendChild(background);
    }
    backLayer(backLayerImage) {
        var backLayer = document.createElement("backLayer");
        backLayer.style.backgroundImage = "url(\"images/backgrounds/backLayer" + backLayerImage + ".jpg\")";
        document.getElementById("background").appendChild(backLayer);
    }
    midLayer() {
        this.backgroundCells = new backgroundCells(26, 36, "backgroundCellSmall", "small");
        this.backgroundCells = new backgroundCells(16, 26, "backgroundCellMedium", "medium");
        this.backgroundCells = new backgroundCells(6, 16, "backgroundCellLarge", "large");
    }
    frontLayer(frontLayerImage, animation) {
        var frontLayer = document.createElement("frontLayer");
        frontLayer.style.backgroundImage = "url(\"images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
        document.getElementById("background").appendChild(frontLayer);
        if (animation == true) {
            frontLayer.style.animation = "changeFrontLayer 210000ms linear";
            frontLayer.style.animationFillMode = "forwards";
        }
    }
}
class backgroundCells {
    constructor(start, end, div, size) {
        this.start = start;
        this.end = end;
        this.size = size;
        for (var i = this.start; i < this.end; i++) {
            let backgroundCell = document.createElement(div);
            let randomImage = Math.floor(Math.random() * 15 + 1);
            let positionX = window.innerWidth;
            let randomPositionY = Math.floor(Math.random() * window.innerHeight);
            let randomAnimationSpeed = i;
            backgroundCell.style.backgroundImage = "url(\"images/backgrounds/cell" + randomImage + this.size + ".png\")";
            backgroundCell.style.transform = "translatez(0)";
            backgroundCell.style.left = positionX + "px";
            backgroundCell.style.top = randomPositionY + "px";
            backgroundCell.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s linear infinite";
            document.getElementById("background").appendChild(backgroundCell);
        }
    }
}
class GameObject {
    constructor(pos) {
        this.position = pos;
    }
    changeImage(image) {
        this.div.style.backgroundImage = (image);
    }
}
class Enemy extends GameObject {
    constructor(pos) {
        super(pos);
    }
    randomPosition() {
        let random = Math.floor(Math.random() * 4) + 1;
        if (random == 1) {
            var x = -125;
            var y = Math.floor(Math.random() * window.innerHeight);
            return new Vector(x, y);
        }
        else if (random == 2) {
            var x = window.innerWidth + 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        }
        else if (random == 3) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = -125;
            return new Vector(x, y);
        }
        else if (random == 4) {
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = window.innerHeight + 125;
            return new Vector(x, y);
        }
    }
    hitsLife(life) {
        if (this.rectangle.hitsOtherRectangle(life.rectangle)) {
            return true;
        }
    }
    remove() {
        this.div.remove();
    }
}
class Bacteria extends Enemy {
    constructor(id, pos) {
        super(pos);
        this.counter = 300;
        this.id = id;
        this.div = document.createElement("bacteria");
        this.div.setAttribute("id", "bacteria" + this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.random = Math.floor((Math.random() * 5) + 3);
        let random = Math.floor(Math.random() * 60);
        this.counter = this.counter - random;
    }
    move(life) {
        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(this.random / 7);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectanglePosition = new Vector(this.position.x + 25, this.position.y + 50);
        this.rectangle = new Rectangle(this.rectanglePosition, 150, 100);
        this.hitboxPosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 400, 400);
    }
}
var glasses1Scale;
var glasses2Scale;
class Player extends GameObject {
    constructor(left, right, up, down, pos, playerNumber, joystick) {
        super(pos);
        this.playerNumber = playerNumber;
        this.joystick = joystick;
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.speed = new Vector(0, 0);
        this.rightSpeed = new Vector(0, 0);
        this.leftSpeed = new Vector(0, 0);
        this.upSpeed = new Vector(0, 0);
        this.downSpeed = new Vector(0, 0);
        this.width = 200;
        this.height = 200;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    hitsVirus(virus) {
        if (this.rectangle.hitsOtherRectangle(virus.rectangle)) {
            console.log("raakt virus");
            return true;
        }
    }
    getBounds() {
        return new Rectangle(this.position, this.width, this.height);
    }
    ;
    onKeyDown(event) {
        switch (event.keyCode) {
            case this.upkey:
                this.moveUp();
                break;
            case this.downkey:
                this.moveDown();
                break;
            case this.leftkey:
                this.moveLeft();
                break;
            case this.rightkey:
                this.moveRight();
                break;
        }
    }
    moveLeft() {
        this.leftSpeed = new Vector(-10, 0);
        switch (this.playerNumber) {
            case 1:
                glasses1Scale = "scaleX(-1)";
                document.getElementById("character1Body").style.transform = "scaleX(-1)";
                document.getElementById("character1Mouth").style.transform = "scaleX(-1)";
                document.getElementById("character1Glasses").style.transform = glasses1Scale;
                break;
            case 2:
                glasses2Scale = "scaleX(-1)";
                document.getElementById("character2Body").style.transform = "scaleX(-1)";
                document.getElementById("character2Mouth").style.transform = "scaleX(-1)";
                document.getElementById("character2Glasses").style.transform = glasses2Scale;
                break;
        }
    }
    moveRight() {
        this.rightSpeed = new Vector(10, 0);
        switch (this.playerNumber) {
            case 1:
                glasses1Scale = "scaleX(1)";
                document.getElementById("character1Body").style.transform = "scaleX(1)";
                document.getElementById("character1Mouth").style.transform = "scaleX(1)";
                document.getElementById("character1Glasses").style.transform = glasses1Scale;
                break;
            case 2:
                glasses2Scale = "scaleX(1)";
                document.getElementById("character2Body").style.transform = "scaleX(1)";
                document.getElementById("character2Mouth").style.transform = "scaleX(1)";
                document.getElementById("character2Glasses").style.transform = glasses2Scale;
                break;
        }
    }
    moveUp() {
        this.upSpeed = new Vector(0, -10);
    }
    moveDown() {
        this.downSpeed = new Vector(0, 10);
    }
    onKeyUp(event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, 0);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 0);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(0, 0);
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(0, 0);
                break;
        }
    }
    move() {
        if (this.joystick) {
            if (this.joystick.Left) {
                this.moveLeft();
            }
            else
                this.leftSpeed = new Vector(0, 0);
            if (this.joystick.Right) {
                this.moveRight();
            }
            else
                this.rightSpeed = new Vector(0, 0);
            if (this.joystick.Up) {
                this.moveUp();
            }
            else
                this.upSpeed = new Vector(0, 0);
            if (this.joystick.Down) {
                this.moveDown();
            }
            else
                this.downSpeed = new Vector(0, 0);
        }
        this.hitboxPosition = new Vector(this.position.x + 25, this.position.y + 25);
        this.rectangle = new Rectangle(this.hitboxPosition, 100, 100);
        this.position = this.position.add(this.leftSpeed.add(this.rightSpeed));
        this.position = this.position.add(this.upSpeed.add(this.downSpeed));
        switch (this.playerNumber) {
            case 1:
                document.getElementById("character1").style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
                break;
            case 2:
                document.getElementById("character2").style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
                break;
        }
        this.position.x = this.clamp(this.position.x, 0, window.innerWidth - this.width);
        this.position.y = this.clamp(this.position.y, 0, window.innerHeight - this.height);
    }
    clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
}
var glassesNumber1 = 1;
var glassesNumber2 = 1;
class Character extends Player {
    constructor(left, right, up, down, pos, playerNumber, joystick) {
        super(left, right, up, down, pos, playerNumber, joystick);
        this.characterNumber = playerNumber;
        this.div = document.createElement("character");
        this.div.setAttribute("id", "character" + this.characterNumber);
        document.getElementById("background").appendChild(this.div);
        this.body = document.createElement("characterBody");
        this.body.setAttribute("id", "character" + this.characterNumber + "Body");
        document.getElementById("character" + this.characterNumber).appendChild(this.body);
        this.mouth = document.createElement("characterMouth");
        this.mouth.setAttribute("id", "character" + this.characterNumber + "Mouth");
        document.getElementById("character" + this.characterNumber).appendChild(this.mouth);
        this.glasses = document.createElement("characterGlasses");
        this.glasses.setAttribute("id", "character" + this.characterNumber + "Glasses");
        switch (this.characterNumber) {
            case 1:
                this.glasses.style.backgroundImage = "url('images/player/glasses" + glassesNumber1 + ".png')";
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
            case 2:
                this.glasses.style.backgroundImage = "url('images/player/glasses" + glassesNumber2 + ".png')";
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
        }
    }
}
class CharacterSelect {
    constructor(game, playerCount) {
        this.delay = 30;
        this.playerCount = 0;
        this.chooseGlasses1 = () => {
            if (glassesNumber1 == 16) {
                glassesNumber1 = 1;
                this.changeGlasses1();
            }
            else {
                glassesNumber1 += 1;
                this.changeGlasses1();
            }
        };
        this.chooseGlasses1Prev = () => {
            if (glassesNumber1 == 1) {
                glassesNumber1 = 15;
                this.changeGlasses1();
            }
            else {
                glassesNumber1 -= 1;
                this.changeGlasses1();
            }
        };
        this.changeGlasses1 = () => {
            var glasses = document.getElementById("player1Glasses");
            glasses.style.backgroundImage = "url(\"images/player/glasses" + glassesNumber1 + ".png\")";
        };
        this.chooseGlasses2 = () => {
            if (glassesNumber2 == 16) {
                glassesNumber2 = 1;
                this.changeGlasses2();
            }
            else {
                glassesNumber2 += 1;
                this.changeGlasses2();
            }
        };
        this.chooseGlasses2Prev = () => {
            if (glassesNumber2 == 1) {
                glassesNumber2 = 15;
                this.changeGlasses2();
            }
            else {
                glassesNumber2 -= 1;
                this.changeGlasses2();
            }
        };
        this.changeGlasses2 = () => {
            var glasses = document.getElementById("player2Glasses");
            glasses.style.backgroundImage = "url(\"images/player/glasses" + glassesNumber2 + ".png\")";
        };
        this.game = game;
        this.playerCount = playerCount;
        this.gameMode(playerCount);
        if (playerCount == 1) {
            this.buttonListener = () => this.singleplayer();
        }
        else {
            this.buttonListener = () => this.multiplayer();
        }
        document.addEventListener("joystick0button0", this.buttonListener);
        document.addEventListener("joystick1button0", this.buttonListener);
    }
    singleplayer() {
        document.removeEventListener("joystick0button0", this.buttonListener);
        document.removeEventListener("joystick1button0", this.buttonListener);
        new Level1(this.game, 1);
    }
    multiplayer() {
        document.removeEventListener("joystick0button0", this.buttonListener);
        document.removeEventListener("joystick1button0", this.buttonListener);
        new Level1(this.game, 2);
    }
    update() {
        this.game.Arcade.Joysticks.forEach(j => j.update());
        let player1 = this.game.Arcade.Joysticks[0];
        let player2 = this.game.Arcade.Joysticks[1];
        if (player1) {
            if (player1.Left) {
                if (this.playerCount == 1)
                    this.buttonLeft.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                else {
                    this.buttonLeft1.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                }
                if (this.delay >= 30) {
                    this.chooseGlasses1Prev();
                    this.delay = 0;
                }
            }
            else if (player1.Right) {
                if (this.playerCount == 1)
                    this.buttonRight.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                else {
                    this.buttonRight1.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                }
                if (this.delay >= 30) {
                    this.chooseGlasses1();
                    this.delay = 0;
                }
            }
            else {
                if (this.playerCount == 1) {
                    this.buttonLeft.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                    this.buttonRight.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                }
                else {
                    this.buttonLeft1.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                    this.buttonRight1.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                }
            }
        }
        if (player2 && this.playerCount == 2) {
            if (player2.Left) {
                this.buttonLeft2.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                if (this.delay >= 30) {
                    this.chooseGlasses2Prev();
                    this.delay = 0;
                }
            }
            else if (player2.Right) {
                this.buttonRight2.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                if (this.delay >= 30) {
                    this.chooseGlasses2();
                    this.delay = 0;
                }
            }
            else {
                this.buttonLeft2.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                this.buttonRight2.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            }
        }
        this.delay++;
    }
    gameMode(playerCount) {
        if (playerCount == 1) {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            let background = new Background(1, 1, false);
            var music = new Music(2);
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "50%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            let player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('images/player/glasses" + glassesNumber1 + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            let controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            controllers.style.marginLeft = "-150px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "50%";
            let arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.marginLeft = "-57.5px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "50%";
            arrowUpButton.style.backgroundImage = "url('images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            let arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.marginLeft = "-57.5px";
            arrowRightButton.style.top = "64%";
            arrowRightButton.style.left = "55.2%";
            arrowRightButton.style.backgroundImage = "url('images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id", "arrowUpButton");
            let arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.marginLeft = "-57.5px";
            arrowDownButton.style.top = "64%";
            arrowDownButton.style.left = "50%";
            arrowDownButton.style.backgroundImage = "url('images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id", "arrowDownButton");
            let arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.marginLeft = "-57.5px";
            arrowLeftButton.style.top = "64%";
            arrowLeftButton.style.left = "45%";
            arrowLeftButton.style.backgroundImage = "url('images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            this.buttonRight = document.createElement("chooseButtonRight");
            this.buttonRight.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonRight.style.cursor = "pointer";
            this.buttonRight.style.width = "82px";
            this.buttonRight.style.height = "110px";
            this.buttonRight.style.transform = "scale(" + -1 + ")";
            this.buttonRight.style.top = "30%";
            this.buttonRight.style.left = "60%";
            this.buttonRight.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonRight);
            this.buttonRight.setAttribute("id", "buttonRight");
            document.getElementById("buttonRight").addEventListener("click", this.chooseGlasses1);
            this.buttonLeft = document.createElement("chooseButtonLeft");
            this.buttonLeft.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonLeft.style.cursor = "pointer";
            this.buttonLeft.style.width = "80px";
            this.buttonLeft.style.height = "110px";
            this.buttonLeft.style.top = "30%";
            this.buttonLeft.style.left = "40%";
            this.buttonLeft.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonLeft);
            this.buttonLeft.setAttribute("id", "buttonLeft");
            document.getElementById("buttonLeft").addEventListener("click", this.chooseGlasses1Prev);
            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "50%";
            startButton.style.marginLeft = "-142.5px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.singleplayer);
            startButton.onmouseover = function () {
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton-hover.png\")";
            };
            startButton.onmouseleave = function () {
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton.png\")";
            };
        }
        else {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1, 1, false);
            var music = new Music(2);
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "75%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            let player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('images/player/glasses" + glassesNumber1 + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            this.buttonRight1 = document.createElement("chooseButtonRight1");
            this.buttonRight1.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonRight1.style.cursor = "pointer";
            this.buttonRight1.style.width = "82px";
            this.buttonRight1.style.height = "110px";
            this.buttonRight1.style.transform = "scale(" + -1 + ")";
            this.buttonRight1.style.top = "30%";
            this.buttonRight1.style.left = "85%";
            this.buttonRight1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonRight1);
            this.buttonRight1.setAttribute("id", "buttonRight1");
            document.getElementById("buttonRight1").addEventListener("click", this.chooseGlasses1);
            this.buttonLeft1 = document.createElement("chooseButtonLeft1");
            this.buttonLeft1.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonLeft1.style.cursor = "pointer";
            this.buttonLeft1.style.width = "80px";
            this.buttonLeft1.style.height = "110px";
            this.buttonLeft1.style.top = "30%";
            this.buttonLeft1.style.left = "65%";
            this.buttonLeft1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonLeft1);
            this.buttonLeft1.setAttribute("id", "buttonLeft1");
            document.getElementById("buttonLeft1").addEventListener("click", this.chooseGlasses1Prev);
            let player2 = document.createElement("choosePlayer2");
            player2.setAttribute("id", "choosePlayer2");
            player2.style.backgroundImage = "url('images/player/player.png')";
            player2.style.width = "200px";
            player2.style.height = "200px";
            player2.style.top = "25%";
            player2.style.left = "25%";
            player2.style.marginLeft = "-100px";
            player2.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player2);
            let player2Mouth = document.createElement("player2Mouth");
            player2Mouth.style.backgroundImage = "url('images/player/mouth1.png')";
            player2Mouth.style.width = "200px";
            player2Mouth.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Mouth);
            let player2Glasses = document.createElement("player2Glasses");
            player2Glasses.style.backgroundImage = "url('images/player/glasses" + glassesNumber2 + ".png')";
            player2Glasses.style.width = "200px";
            player2Glasses.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Glasses);
            player2Glasses.setAttribute("id", "player2Glasses");
            let controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "68%";
            let controllers2 = document.createElement('controllers2');
            controllers2.style.backgroundImage = "url('images/interface/icons/controllers.png')";
            controllers2.style.width = "300px";
            controllers2.style.height = "123px";
            document.getElementById("background").appendChild(controllers2);
            controllers2.style.top = "45%";
            controllers2.style.left = "18%";
            let arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "72.6%";
            arrowUpButton.style.backgroundImage = "url('images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            let arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.top = "64.1%";
            arrowRightButton.style.left = "77.5%";
            arrowRightButton.style.backgroundImage = "url('images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id", "arrowUpButton");
            let arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.top = "64.1%";
            arrowDownButton.style.left = "72.5%";
            arrowDownButton.style.backgroundImage = "url('images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id", "arrowDownButton");
            let arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.top = "64.1%";
            arrowLeftButton.style.left = "67.7%";
            arrowLeftButton.style.backgroundImage = "url('images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            let wButton = document.createElement('wButton');
            wButton.style.height = "115px";
            wButton.style.width = "115px";
            wButton.style.top = "54.3%";
            wButton.style.left = "22.1%";
            wButton.style.backgroundImage = "url('images/interface/icons/w-button.png')";
            document.getElementById('background').appendChild(wButton);
            wButton.setAttribute("id", "wButton");
            let dButton = document.createElement('dButton');
            dButton.style.height = "115px";
            dButton.style.width = "115px";
            dButton.style.top = "64.1%";
            dButton.style.left = "27%";
            dButton.style.backgroundImage = "url('images/interface/icons/d-button.png')";
            document.getElementById('background').appendChild(dButton);
            dButton.setAttribute("id", "dButton");
            let sButton = document.createElement('sButton');
            sButton.style.height = "115px";
            sButton.style.width = "115px";
            sButton.style.top = "64.1%";
            sButton.style.left = "22.1%";
            sButton.style.backgroundImage = "url('images/interface/icons/s-button.png')";
            document.getElementById('background').appendChild(sButton);
            sButton.setAttribute("id", "sButton");
            let aButton = document.createElement('aButton');
            aButton.style.height = "115px";
            aButton.style.width = "115px";
            aButton.style.top = "64.1%";
            aButton.style.left = "17.2%";
            aButton.style.backgroundImage = "url('images/interface/icons/a-button.png')";
            document.getElementById('background').appendChild(aButton);
            aButton.setAttribute("id", "aButton");
            this.buttonRight2 = document.createElement("chooseButtonRight1");
            this.buttonRight2.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonRight2.style.cursor = "pointer";
            this.buttonRight2.style.width = "82px";
            this.buttonRight2.style.height = "110px";
            this.buttonRight2.style.transform = "scale(" + -1 + ")";
            this.buttonRight2.style.top = "30%";
            this.buttonRight2.style.left = "35%";
            this.buttonRight2.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonRight2);
            this.buttonRight2.setAttribute("id", "buttonRight2");
            document.getElementById("buttonRight2").addEventListener("click", this.chooseGlasses2);
            this.buttonLeft2 = document.createElement("chooseButtonLeft1");
            this.buttonLeft2.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonLeft2.style.cursor = "pointer";
            this.buttonLeft2.style.width = "80px";
            this.buttonLeft2.style.height = "110px";
            this.buttonLeft2.style.top = "30%";
            this.buttonLeft2.style.left = "15%";
            this.buttonLeft2.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonLeft2);
            this.buttonLeft2.setAttribute("id", "buttonLeft2");
            document.getElementById("buttonLeft2").addEventListener("click", this.chooseGlasses2Prev);
            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "47%";
            startButton.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.multiplayer);
            startButton.onmouseover = function () {
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton-hover.png\")";
            };
            startButton.onmouseleave = function () {
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton.png\")";
            };
        }
    }
}
class Game {
    get Arcade() { return this.arcade; }
    constructor() {
        this.arcade = new Arcade(true);
        this.titleScreen = new Titlescreen(this);
        this.update();
    }
    update() {
        this.titleScreen.update();
        requestAnimationFrame(() => this.update());
    }
}
class GameOver {
    constructor(game, score, playerCount) {
        this.mode = "replay";
        this.joystickStatus = "left";
        this.game = game;
        var background = new Background(1, 1, false);
        this.playerCount = playerCount;
        this.finalScore = score;
        document.getElementById("background").style.cursor = "auto";
        this.createFinalScore();
        this.buttonListener = () => this.handleButton();
        document.addEventListener("joystick0button0", this.buttonListener);
        document.addEventListener("joystick1button0", this.buttonListener);
    }
    handleButton() {
        document.removeEventListener("joystick0button0", this.buttonListener);
        document.removeEventListener("joystick1button0", this.buttonListener);
        this.goBack();
    }
    levelload1() {
        if (this.playerCount == 1) {
            new Level1(this.game, 1);
        }
        else {
            new Level1(this.game, 2);
        }
    }
    goBack() {
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen(this.game);
    }
    createFinalScore() {
        this.feedbackDiv = document.createElement("span");
        this.feedbackDiv.setAttribute("id", "feedback");
        document.getElementById("background").appendChild(this.feedbackDiv);
        this.scoreContainerDiv = document.createElement("span");
        this.scoreContainerDiv.setAttribute("id", "score-container");
        document.getElementById("background").appendChild(this.scoreContainerDiv);
        this.scoreDiv = document.createElement("span");
        this.scoreDiv.setAttribute("id", "score");
        document.getElementById("score-container").appendChild(this.scoreDiv);
        this.totalContainerDiv = document.createElement("span");
        this.totalContainerDiv.setAttribute("id", "total-container");
        document.getElementById("score-container").appendChild(this.totalContainerDiv);
        this.totalDiv = document.createElement("span");
        this.totalDiv.setAttribute("id", "total");
        this.totalDiv.innerHTML = "" + this.finalScore;
        document.getElementById("total-container").appendChild(this.totalDiv);
        this.tryAgainDiv = document.createElement("span");
        this.tryAgainDiv.setAttribute("id", "tryAgain");
        this.tryAgainDiv.innerHTML = "Press FIRE to restart";
        document.getElementById("background").appendChild(this.tryAgainDiv);
        let widthScore = document.getElementById("score").clientWidth;
        let widthTotal = document.getElementById("total").clientWidth;
        let scoreContainerWidth = widthScore + widthTotal;
        let windowWidth = window.innerWidth;
        let offsetLeft = (windowWidth - scoreContainerWidth) / 2;
        let marginLeft = scoreContainerWidth / 2;
        marginLeft = offsetLeft;
        this.scoreContainerDiv.style.width = "" + scoreContainerWidth + "px";
        this.scoreContainerDiv.style.marginLeft = "" + marginLeft + "px";
    }
}
var bacteriaCount = 0;
class Level1 {
    constructor(game, playerCount) {
        this.lifes = new Array();
        this.viruses = new Array();
        this.bacteria = new Array();
        this.virusCount = 0;
        this.scoreCount = 0;
        this.game = game;
        this.enemy = new Enemy(new Vector(0, 0));
        this.playerCount = playerCount;
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        var background = new Background(1, 1, true);
        document.getElementById("background").style.cursor = "none";
        this.score = document.createElement("score");
        this.score.innerHTML = "" + this.scoreCount;
        this.score.style.marginLeft = "50%";
        this.score.style.width = "100px";
        this.score.style.height = "50px";
        this.score.style.fontSize = "70px";
        document.body.appendChild(this.score);
        this.spawnTime = 2000;
        if (playerCount == 1) {
            for (var i = 0; i < 1; i++) {
                this.lifes.push(new Life(i));
            }
            this.spawnTimer(this.spawnVirus, this.spawnTime);
            this.char1 = new Character(37, 39, 38, 40, new Vector(500, 500), 1, this.game.Arcade.Joysticks[0]);
        }
        else {
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }
            this.timer = setInterval(this.spawnVirus.bind(this), 750);
            this.char1 = new Character(37, 39, 38, 40, new Vector(1500, 1500), 1, this.game.Arcade.Joysticks[0]);
            this.char2 = new Character(65, 68, 87, 83, new Vector(1500, 1500), 2, this.game.Arcade.Joysticks[1]);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    spawnVirus() {
        let random = Math.floor(Math.random() * 10);
        if (random <= 7) {
            this.viruses.push(new Virus(this.virusCount, this.enemy.randomPosition()));
            this.virusCount++;
            console.log("virus");
        }
        else {
            this.bacteria.push(new Bacteria(bacteriaCount, this.enemy.randomPosition()));
            bacteriaCount++;
            console.log("bacteria");
        }
        if (this.spawnTime > 200) {
            this.spawnTime = this.spawnTime - 10;
        }
        clearInterval(this.timer);
        this.spawnTimer(this.spawnVirus, this.spawnTime);
    }
    spawnTimer(spawnVirus, time) {
        this.timer = setInterval(this.spawnVirus.bind(this), this.spawnTime);
    }
    gameLoop() {
        this.game.Arcade.Joysticks.forEach(j => j.update());
        var character1Mouth = document.getElementById("character1Mouth");
        var character1Glasses = document.getElementById("character1Glasses");
        var character2Mouth = document.getElementById("character2Mouth");
        var character2Glasses = document.getElementById("character2Glasses");
        let inRange1 = false;
        let inRange2 = false;
        if (this.playerCount == 1) {
            this.char1.move();
        }
        else {
            this.char1.move();
            this.char2.move();
        }
        for (let i = 0; i < this.lifes.length; i++) {
            this.lifes[i].move();
        }
        for (let i = 0; i < this.viruses.length; i++) {
            let random = Math.floor(Math.random() * this.lifes.length);
            if (this.lifes.length == 0) {
                this.viruses.splice(0, this.viruses.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new GameOver(this.game, this.scoreCount, this.playerCount);
            }
            else {
                this.viruses[i].move(this.lifes[random]);
                if (this.viruses[i].hitsLife(this.lifes[random]) == true) {
                    var life = document.getElementById("" + this.lifes[random].id);
                    life.remove();
                    this.lifes.splice(random, 1);
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                }
            }
            if (this.playerCount == 1) {
                if (this.viruses[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    console.log("hitbox detected");
                    this.viruses[i].changeImage("url(\"images/characters/virus2.png\")");
                    inRange1 = true;
                }
                else {
                    this.viruses[i].changeImage("url(\"images/characters/virus1.png\")");
                }
                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                }
            }
            else {
                if (this.viruses[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    console.log("hitbox detected");
                    this.viruses[i].changeImage("url(\"images/characters/virus2.png\")");
                    inRange1 = true;
                }
                else if (this.viruses[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    console.log("hitbox detected");
                    this.viruses[i].changeImage("url(\"images/characters/virus2.png\")");
                    inRange2 = true;
                }
                else {
                    this.viruses[i].changeImage("url(\"images/characters/virus1.png\")");
                }
                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 6);
                    var nomSound = new NomSound(this.randomNomNumber);
                }
                else if (this.viruses[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 11);
                    var nomSound = new NomSound(this.randomNomNumber);
                }
            }
        }
        if (this.bacteria.length > 0) {
            for (let i = 0; i < this.bacteria.length; i++) {
                let random = Math.floor(Math.random() * this.lifes.length);
                this.bacteria[i].counter--;
                if (this.bacteria[i].counter == 0) {
                    let newPosition = new Vector(this.bacteria[i].position.x, this.bacteria[i].position.y - 40);
                    this.bacteria.push(new Bacteria(bacteriaCount, newPosition));
                    this.bacteria[i].position.y += 40;
                    this.bacteria[i].div.style.transform = "translate(" + this.bacteria[i].position.x + "px, " + this.bacteria[i].position.y + "px)";
                    bacteriaCount++;
                    this.bacteria[i].counter = 300;
                }
                if (this.lifes.length == 0) {
                    this.bacteria.splice(0, this.bacteria.length);
                    clearInterval(this.timer);
                    this.utils.removePreviousBackground();
                    new GameOver(this.scoreCount, this.playerCount, this.game);
                }
                else {
                    this.bacteria[i].move(this.lifes[0]);
                    let angle = Math.atan2(this.lifes[0].position.y - this.bacteria[i].position.y, this.lifes[0].position.x - this.bacteria[i].position.x);
                    angle = angle * (180 / Math.PI);
                    if (angle < 0) {
                        angle = 360 - (-angle);
                    }
                    if (this.bacteria[i].direction.x >= 0) {
                        this.bacteria[i].div.style.transform = "translate(" + this.bacteria[i].position.x + "px, " + this.bacteria[i].position.y + "px) rotate(" + angle + "deg) scale(-1, 1)";
                    }
                    else {
                        this.bacteria[i].div.style.transform = "translate(" + this.bacteria[i].position.x + "px, " + this.bacteria[i].position.y + "px) rotate(" + angle + "deg) scale(-1, -1)";
                    }
                }
                if (this.playerCount == 1) {
                    if (this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.bacteria[i].counter > 60) {
                        console.log("hitbox detected");
                        this.bacteria[i].changeImage("url(\"images/characters/bacteria2.png\")");
                        inRange1 = true;
                    }
                    else if (this.bacteria[i].counter > 60) {
                        this.bacteria[i].changeImage("url(\"images/characters/bacteria1.png\")");
                    }
                    else {
                        this.bacteria[i].changeImage("url(\"images/enemy/bacteria3.png\")");
                    }
                    if (this.bacteria[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                        this.bacteria[i].remove();
                        this.bacteria.splice(i, 1);
                        this.scoreCount++;
                        this.score.innerHTML = "" + this.scoreCount;
                        this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                        var nomSound = new NomSound(this.randomNomNumber);
                        break;
                    }
                }
                else {
                    if (this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.bacteria[i].counter > 60) {
                        console.log("hitbox detected");
                        this.bacteria[i].changeImage("url(\"images/characters/bacteria2.png\")");
                        inRange1 = true;
                    }
                    else if (this.bacteria[i].hitbox.hitsOtherRectangle(this.char2.rectangle) && this.bacteria[i].counter > 60) {
                        console.log("hitbox detected");
                        this.bacteria[i].changeImage("url(\"images/characters/bacteria2.png\")");
                        inRange2 = true;
                    }
                    else if (this.bacteria[i].counter < 60 && this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                        this.bacteria[i].changeImage("url(\"images/enemy/bacteria3.png\")");
                        inRange1 = true;
                    }
                    else if (this.bacteria[i].counter < 60 && this.bacteria[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                        this.bacteria[i].changeImage("url(\"images/enemy/bacteria3.png\")");
                        inRange2 = true;
                    }
                    else if (this.bacteria[i].counter < 60) {
                        this.bacteria[i].changeImage("url(\"images/enemy/bacteria3.png\")");
                    }
                    else {
                        this.bacteria[i].changeImage("url(\"images/characters/bacteria1.png\")");
                    }
                    if (this.bacteria[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                        this.bacteria[i].remove();
                        this.bacteria.splice(i, 1);
                        this.scoreCount++;
                        this.score.innerHTML = "" + this.scoreCount;
                        this.randomNomNumber = Math.floor(Math.random() * 5 + 6);
                        var nomSound = new NomSound(this.randomNomNumber);
                        break;
                    }
                    else if (this.bacteria[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                        this.bacteria[i].remove();
                        this.bacteria.splice(i, 1);
                        this.scoreCount++;
                        this.score.innerHTML = "" + this.scoreCount;
                        this.randomNomNumber = Math.floor(Math.random() * 5 + 11);
                        var nomSound = new NomSound(this.randomNomNumber);
                        break;
                    }
                }
                if (this.bacteria[i].hitsLife(this.lifes[random]) == true) {
                    var life = document.getElementById("" + this.lifes[random].id);
                    life.remove();
                    this.lifes.splice(random, 1);
                    this.bacteria[i].remove();
                    this.bacteria.splice(i, 1);
                }
            }
        }
        if (this.playerCount == 1) {
            if (inRange1) {
                character1Mouth.style.backgroundImage = "url(\"images/player/mouth2.png\")";
                if (glasses1Scale != "scaleX(-1)") {
                    character1Glasses.style.transform = "rotate(-45deg) " + glasses1Scale;
                }
                else {
                    character1Glasses.style.transform = "rotate(45deg) " + glasses1Scale;
                }
            }
            else {
                character1Mouth.style.backgroundImage = "url(\"images/player/mouth1.png\")";
                character1Glasses.style.transform = "rotate(0deg) " + glasses1Scale;
            }
        }
        else {
            if (inRange1) {
                character1Mouth.style.backgroundImage = "url(\"images/player/mouth2.png\")";
                if (glasses1Scale != "scaleX(-1)") {
                    character1Glasses.style.transform = "rotate(-45deg) " + glasses1Scale;
                }
                else {
                    character1Glasses.style.transform = "rotate(45deg) " + glasses1Scale;
                }
            }
            else {
                character1Mouth.style.backgroundImage = "url(\"images/player/mouth1.png\")";
                character1Glasses.style.transform = "rotate(0deg)" + glasses1Scale;
            }
            if (inRange2) {
                character2Mouth.style.backgroundImage = "url(\"images/player/mouth2.png\")";
                if (glasses2Scale != "scaleX(-1)") {
                    character2Glasses.style.transform = "rotate(-45deg) " + glasses2Scale;
                }
                else {
                    character2Glasses.style.transform = "rotate(45deg) " + glasses2Scale;
                }
            }
            else {
                character2Mouth.style.backgroundImage = "url(\"images/player/mouth1.png\")";
                character2Glasses.style.transform = "rotate(0deg) " + glasses2Scale;
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
class Life {
    constructor(id) {
        this.id = id;
        this.div = document.createElement("redBloodCell");
        this.div.setAttribute("id", "" + this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.newPosition = this.randomPosition();
        this.width = 75;
        this.height = 75;
    }
    randomPosition() {
        let x = Math.floor(Math.random() * window.innerWidth / 3) + window.innerWidth / 3;
        let y = Math.floor(Math.random() * window.innerHeight / 3) + window.innerHeight / 3;
        return new Vector(x, y);
    }
    move() {
        this.newRectangle = new Rectangle(this.newPosition, 10, 10);
        this.rectangle = new Rectangle(this.position, 50, 50);
        if (this.rectangle.hitsOtherRectangle(this.newRectangle)) {
            this.newPosition = this.randomPosition();
        }
        else {
            this.direction = this.newPosition.difference(this.position);
            this.direction = this.direction.normalize();
            let randomSpeed = Math.floor((Math.random() * 3) + 1);
            this.direction = this.direction.scale(randomSpeed);
            this.position = this.position.add(this.direction);
            if (this.direction.x >= 0) {
                this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scaleX(1)";
            }
            else {
                this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scaleX(-1)";
            }
        }
    }
    draw() {
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    }
}
window.addEventListener("load", function () {
    new Game();
});
class Music {
    constructor(musicNumber) {
        this.musicLoop(musicNumber);
    }
    musicLoop(musicNumber) {
        var audio = document.createElement("audio");
        audio.src = "audio/music" + musicNumber + ".mp3";
        audio.loop = true;
        audio.play();
        document.getElementById("background").appendChild(audio);
    }
}
class NomSound {
    constructor(nomNumber) {
        this.nomSound(nomNumber);
    }
    nomSound(nomNumber) {
        var audio = document.createElement("audio");
        audio.src = "../audio/nom" + nomNumber + ".mp3";
        audio.loop = false;
        audio.play();
        document.getElementById("background").appendChild(audio);
    }
}
class Rectangle {
    constructor(pos, w, h) {
        this.position = pos;
        this.width = w;
        this.height = h;
    }
    hitsPoint(posx, posy) {
        var differencex = this.position.x - posx;
        var differencey = this.position.y - posy;
        return Math.abs(differencex) < this.width / 2 && Math.abs(differencey) < this.height / 2;
    }
    hitsOtherRectangle(rec) {
        var differencex = this.position.x - rec.position.x;
        var differencey = this.position.y - rec.position.y;
        return Math.abs(differencex) < this.width / 2 + rec.width / 2 && Math.abs(differencey) < this.height / 2 + rec.height / 2;
    }
    isInsideRectangle(rec) {
        var rx = this.position.x - rec.position.x;
        var ry = this.position.y - rec.position.y;
        return (rx > 0 &&
            rx + this.width < window.innerWidth &&
            ry > 0 &&
            ry + this.height < window.innerHeight);
    }
}
class Titlescreen {
    constructor(game) {
        this.mode = 1;
        this.game = game;
        new Background(1, 1, false);
        this.titleAnimation();
        this.createMenu();
        var music = new Music(1);
        this.player1.style.backgroundImage = "url(\"images/interface/icons/1player_hover.png\")";
        this.buttonListener = (e) => this.CharacterSelect(e);
        this.player1.addEventListener("click", this.buttonListener);
        this.player2.addEventListener("click", this.buttonListener);
        document.addEventListener("joystick0button0", this.buttonListener);
        document.addEventListener("joystick1button0", this.buttonListener);
    }
    update() {
        this.game.Arcade.Joysticks.forEach(j => {
            j.update();
            if (j.Up) {
                this.player1.style.backgroundImage = "url(\"images/interface/icons/1player_hover.png\")";
                this.player2.style.backgroundImage = "url(\"images/interface/icons/2players.png\")";
                this.mode = 1;
            }
            if (j.Down) {
                this.player2.style.backgroundImage = "url(\"images/interface/icons/2players_hover.png\")";
                this.player1.style.backgroundImage = "url(\"images/interface/icons/1player.png\")";
                this.mode = 2;
            }
        });
        if (this.characterSelect)
            this.characterSelect.update();
    }
    levelload1() {
        new Level1(this.game, 1);
    }
    levelload2() {
        new Level1(this.game, 2);
    }
    CharacterSelect(e) {
        document.removeEventListener("joystick0button0", this.buttonListener);
        document.removeEventListener("joystick1button0", this.buttonListener);
        this.characterSelect = new CharacterSelect(this.game, this.mode);
    }
    createMenu() {
        this.player1 = document.createElement("player1");
        this.player1.style.backgroundImage = "url(\"images/interface/icons/1player.png\")";
        this.player1.style.cursor = "pointer";
        this.player1.style.width = "472px";
        this.player1.style.height = "82px";
        this.player1.style.left = "50%";
        this.player1.style.top = "50%";
        this.player1.style.marginLeft = "-259px";
        this.player1.style.position = "absolute";
        document.getElementById("background").appendChild(this.player1);
        this.player1.setAttribute("id", "player1");
        this.player1.style.display = "inline-block";
        this.player1.style.animation = "menuMove1 20s infinite";
        this.player2 = document.createElement("player2");
        this.player2.style.backgroundImage = "url(\"images/interface/icons/2players.png\")";
        this.player2.style.cursor = "pointer";
        this.player2.style.width = "519px";
        this.player2.style.height = "78px";
        this.player2.style.left = "50%";
        this.player2.style.top = "60%";
        this.player2.style.marginLeft = "-259px";
        this.player2.style.position = "absolute";
        document.getElementById("background").appendChild(this.player2);
        this.player2.setAttribute("id", "player2");
        this.player2.style.display = "inline-block";
        this.player2.style.animation = "menuMove2 20s infinite";
        var achievements = document.createElement("achievement");
        achievements.style.backgroundImage = "url(\"images/interface/icons/prestaties.png\")";
        achievements.style.cursor = "pointer";
        achievements.style.width = "594px";
        achievements.style.height = "78px";
        achievements.style.left = "50%";
        achievements.style.top = "70%";
        achievements.style.marginLeft = "-259px";
        achievements.style.position = "absolute";
        achievements.style.display = "inline-block";
        achievements.onmouseover = function () {
            achievements.style.backgroundImage = "url(\"images/interface/icons/prestaties_hover.png\")";
        };
        achievements.onmouseleave = function () {
            achievements.style.backgroundImage = "url(\"images/interface/icons/prestaties.png\")";
        };
        achievements.style.animation = "menuMove3 20s infinite";
    }
    titleAnimation() {
        var titleChaseFar = document.createElement('titleChaseFar');
        titleChaseFar.setAttribute("id", "titleChaseFar");
        titleChaseFar.style.backgroundImage = "url(\"images/titlescreen/titleChaseFar.png\")";
        titleChaseFar.style.height = "100px";
        titleChaseFar.style.width = "200px";
        titleChaseFar.style.left = "-200px";
        titleChaseFar.style.top = "30%";
        titleChaseFar.style.position = "absolute";
        titleChaseFar.style.animation = "titleChaseFarMove 15s infinite";
        titleChaseFar.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseFar);
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"images/titlescreen/title3.png\")";
        title1.style.width = "1066px";
        title1.style.height = "434px";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.getElementById("background").appendChild(title1);
        var titleChaseClose = document.createElement('titleChaseClose');
        var positionX = window.innerWidth;
        titleChaseClose.style.backgroundImage = "url(\"images/titlescreen/titleChaseClose.png\")";
        titleChaseClose.style.height = "200px";
        titleChaseClose.style.width = "400px";
        titleChaseClose.style.left = positionX + "px";
        titleChaseClose.style.top = "60%";
        titleChaseClose.style.position = "absolute";
        titleChaseClose.style.animation = "titleChaseCloseMove 15s infinite";
        titleChaseClose.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseClose);
    }
}
class Utils {
    isOverlap(c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    }
    removePreviousBackground() {
        var bg = document.getElementById("background");
        while (bg.hasChildNodes()) {
            bg.removeChild(bg.firstChild);
        }
        bg.remove();
    }
}
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    difference(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    scale(n) {
        return new Vector(this.x * n, this.y * n);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }
    static reflectX(point, x) {
        return new Vector(2 * x - point.x, point.y);
    }
    static reflectY(point, y) {
        return new Vector(point.x, 2 * y - point.y);
    }
}
class Virus extends Enemy {
    constructor(id, pos) {
        super(pos);
        this.id = id;
        this.div = document.createElement("virus");
        this.div.setAttribute("id", "virus" + this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.random = (Math.random() * 1.5) + 0.5;
    }
    move(life) {
        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(this.random);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectanglePosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.rectangle = new Rectangle(this.position, 75, 75);
        this.hitboxPosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300, 300);
    }
}
class Arcade {
    constructor(mp = false) {
        this.DEBUG = false;
        this.REDIRECT_URL = "http://hr-cmgt.github.io/arcade-server";
        this.multiplayer = false;
        this.multiplayer = mp;
        this.joysticks = [];
        if (this.DEBUG)
            this.showStatus("Gamepad is NOT connected. Press a button to connect");
        document.addEventListener("redirect", () => this.onRedirect());
        window.addEventListener("gamepadconnected", (e) => this.onGamePadConnected(e));
        window.addEventListener("gamepaddisconnected", (e) => this.onGamePadDisconnected(e));
    }
    get Joysticks() { return this.joysticks; }
    onRedirect() {
        if (this.DEBUG) {
            console.log('redirect!!');
        }
        window.location.href = this.REDIRECT_URL;
    }
    onGamePadConnected(e) {
        if (this.DEBUG) {
            console.log('Game pad connected');
            console.log("Joystick number: " + e.gamepad.index);
        }
        if ((!this.multiplayer && this.joysticks.length == 0) || this.multiplayer) {
            let joystick = this.createAndAddJoystick(e.gamepad.index, 6);
            joystick.PreviousGamepad = joystick.Gamepad;
            joystick.Gamepad = e.gamepad;
            if (joystick.PreviousGamepad == null) {
                joystick.PreviousGamepad = e.gamepad;
            }
        }
        if (this.DEBUG)
            this.removeStatus();
    }
    onGamePadDisconnected(e) {
        if (this.DEBUG) {
            console.log('Game pad disconnected');
        }
        if (this.DEBUG)
            this.showStatus("Gamepad is NOT connected. Connect the gamepad and press a button.");
        this.removeJoystick(e.gamepad.index);
    }
    createAndAddJoystick(joystickNumber, numOfButtons) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck != null) {
            return joystickCheck;
        }
        let joystickNew = new Joystick(joystickNumber, numOfButtons, this.DEBUG);
        this.joysticks[joystickNumber] = joystickNew;
        if (joystickNew)
            document.dispatchEvent(new CustomEvent("joystickcreated", { detail: joystickNumber }));
        return joystickNew;
    }
    removeJoystick(joystickNumber) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck == null) {
            return;
        }
        var index = this.joysticks.indexOf(joystickCheck);
        this.joysticks[index].destroy();
        if (index > -1) {
            this.joysticks.splice(index, 1);
        }
    }
    getJoystickByNumber(joystickNumber) {
        for (let joystick of this.joysticks) {
            if (joystick.JoystickNumber == joystickNumber) {
                return joystick;
            }
        }
        return null;
    }
    showStatus(content) {
        let container;
        let p;
        if (!(container = document.getElementsByTagName("status")[0])) {
            container = document.createElement("status");
            document.body.append(container);
        }
        if (container) {
            if (!(p = container.getElementsByTagName("p")[0])) {
                p = document.createElement("p");
                container.appendChild(p);
            }
        }
        if (p) {
            p.innerHTML = content;
        }
    }
    removeStatus() {
        let status;
        if (status = document.getElementsByTagName("status")[0]) {
            status.remove();
        }
    }
}
class Joystick {
    constructor(joystickNumber, numOfButtons, debug) {
        this.DEBUG = true;
        this.BUT1 = 8;
        this.BUT2 = 9;
        this.joystickNumber = 0;
        this.numberOfBUttons = 0;
        this.buttonEvents = [];
        this.axes = [];
        this.joystickNumber = joystickNumber;
        this.numberOfBUttons = numOfButtons;
        this.DEBUG = debug;
        for (let i = 0; i < this.numberOfBUttons; i++) {
            this.buttonEvents.push('joystick' + this.JoystickNumber + 'button' + (i));
        }
        if (this.DEBUG) {
            this.debugPanel = new DebugPanel(this, this.numberOfBUttons);
        }
    }
    get Left() { return (this.axes[0] == -1); }
    get Right() { return (this.axes[0] == 1); }
    get Up() { return (this.axes[1] == -1); }
    get Down() { return (this.axes[1] == 1); }
    get Y() { return Math.round(this.axes[1]); }
    get X() { return Math.round(this.axes[0]); }
    get JoystickNumber() { return this.joystickNumber; }
    get ButtonEvents() { return this.buttonEvents; }
    get Gamepad() { return this.gamepad; }
    set Gamepad(gamepad) { this.gamepad = gamepad; }
    get PreviousGamepad() { return this.previousGamepad; }
    set PreviousGamepad(previousGamepad) { this.previousGamepad = previousGamepad; }
    update() {
        let gamepad = navigator.getGamepads()[this.gamepad.index];
        if (gamepad) {
            this.readGamepad(gamepad);
        }
    }
    readGamepad(gamepad) {
        for (let index = 0; index < this.numberOfBUttons; index++) {
            if (this.buttonPressed(gamepad.buttons[index]) && !this.buttonPressed(this.previousGamepad.buttons[index])) {
                document.dispatchEvent(new Event(this.buttonEvents[index]));
            }
            if (this.buttonPressed(gamepad.buttons[this.BUT1]) &&
                this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) || !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                document.dispatchEvent(new Event('redirect'));
            }
        }
        this.axes[0] = Math.round(gamepad.axes[0]);
        this.axes[1] = Math.round(gamepad.axes[1]);
        if (this.DEBUG) {
            this.debugPanel.Axes[0] = this.axes[0];
            this.debugPanel.Axes[1] = this.axes[1];
            this.debugPanel.update();
        }
        this.previousGamepad = gamepad;
    }
    buttonPressed(b) {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }
    destroy() {
        if (this.DEBUG)
            this.debugPanel.remove();
    }
}
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    position:           absolute;
    top:                10px;
    right:              10px;
}
root {
    top:                10px;
    right:              10px;
    width:              289px; 
    height:             120px;
    display:            block;
    background-color:   #75a8f77a;
}

root * {
    position:           relative;
}

.button-wrapper, .axes-wrapper {
    display:            flex;
    flex-wrap:          wrap;
    float:              left;
}

root .button-div {
    border: solid 1px black;
    width:              60px;
    margin:             5px;
    padding:            5px;
}

.button-wrapper {
    width:              164px;
}

.axes-wrapper {
    width:              115px;
    margin:             5px;
}

.axes-cell {
    width:              25px;  
    height:             25px; 
    margin:             5px;  
    border:             solid 1px transparent;
}

.axes-cell.direction {
    border:             solid 1px black;
}

.axes-cell.center{
    border:             solid 1px black;
    background-color:   blue;
}
.axes-cell.active{
    background-color:   red;
}
.identifier{
    position:           absolute;
    top:                5px;
    left:               5px;
    width:              auto;
    font-weight:        bold;
    color:              #fff;
}
</style>`;
class DebugPanel extends HTMLElement {
    constructor(joystick, numOfButtons) {
        super();
        this.panelHeight = 120;
        this.panelSpacing = 10;
        this.buttonDivs = [];
        this.Axes = [];
        this.joystick = joystick;
        this.numberOfButtons = numOfButtons;
        let spaceFromTop = this.panelSpacing + (this.joystick.JoystickNumber * (this.panelHeight + this.panelSpacing));
        this.style.top = spaceFromTop + "px";
        this.rootElement = document.createElement('root');
        this.rootElement.style.height = this.panelHeight + "px";
        template.appendChild(this.rootElement);
        let identifier = document.createElement("div");
        identifier.classList.add('identifier');
        identifier.innerHTML = "#" + this.joystick.JoystickNumber;
        this.rootElement.appendChild(identifier);
        this.createHTMLForAxes();
        this.createHTMLForButtons();
        this.createListenersForButtons();
        this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            let temp = template.content.cloneNode(true);
            temp.appendChild(this.rootElement);
            this.shadowRoot.appendChild(temp);
        }
        document.body.appendChild(this);
    }
    createListenersForButtons() {
        for (let i = 0; i < this.numberOfButtons; i++) {
            document.addEventListener(this.joystick.ButtonEvents[i], (e) => this.handleButtonClicks(e, i));
        }
    }
    handleButtonClicks(event, index) {
        this.buttonDivs[index].style.filter =
            'hue-rotate(' + (Math.random() * 360) + 'deg)';
    }
    createHTMLForButtons() {
        let buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        for (let index = 0; index < this.numberOfButtons; index++) {
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "button-div";
            buttonWrapper.appendChild(buttonDiv);
            buttonDiv.style.backgroundColor = "blue";
            buttonDiv.innerHTML = "Button " + (index + 1);
            this.buttonDivs.push(buttonDiv);
        }
        this.rootElement.appendChild(buttonWrapper);
    }
    createHTMLForAxes() {
        let axesWrapper = document.createElement("div");
        axesWrapper.className = "axes-wrapper";
        for (let i = 1; i <= 9; i++) {
            let cell = document.createElement('div');
            cell.className = "axes-cell";
            if (i % 2 == 0)
                cell.classList.add("direction");
            if (i == 5)
                cell.classList.add("center");
            axesWrapper.appendChild(cell);
            switch (i) {
                case 2:
                    this.up = cell;
                    break;
                case 4:
                    this.left = cell;
                    break;
                case 6:
                    this.right = cell;
                    break;
                case 8:
                    this.down = cell;
                    break;
            }
        }
        this.rootElement.appendChild(axesWrapper);
    }
    update() {
        if (this.Axes[0] == 0) {
            this.left.classList.remove("active");
            this.right.classList.remove("active");
        }
        else {
            if (this.Axes[0] < 0)
                this.left.classList.add("active");
            else if (this.Axes[0] > 0)
                this.right.classList.add("active");
        }
        if (this.Axes[1] == 0) {
            this.up.classList.remove("active");
            this.down.classList.remove("active");
        }
        else {
            if (this.Axes[1] < 0)
                this.up.classList.add("active");
            else if (this.Axes[1] > 0)
                this.down.classList.add("active");
        }
    }
}
window.customElements.define("debug-panel", DebugPanel);
//# sourceMappingURL=main.js.map