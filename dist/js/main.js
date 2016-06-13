var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Background = (function () {
    function Background(backLayerImage, frontLayerImage) {
        this.createBackground();
        this.backLayer(backLayerImage);
        this.midLayer();
        this.frontLayer(frontLayerImage);
    }
    Background.prototype.createBackground = function () {
        var background = document.createElement("background");
        background.setAttribute("id", "background");
        document.body.appendChild(background);
    };
    Background.prototype.backLayer = function (backLayerImage) {
        var backLayer = document.createElement("backLayer");
        backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".png\")";
        document.getElementById("background").appendChild(backLayer);
    };
    Background.prototype.midLayer = function () {
        this.backgroundCells = new backgroundCells(26, 36, "backgroundCellSmall", "small");
        this.backgroundCells = new backgroundCells(16, 26, "backgroundCellMedium", "medium");
        this.backgroundCells = new backgroundCells(6, 16, "backgroundCellLarge", "large");
    };
    Background.prototype.frontLayer = function (frontLayerImage) {
        var frontLayer = document.createElement("frontLayer");
        frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
        document.getElementById("background").appendChild(frontLayer);
    };
    return Background;
}());
var backgroundCells = (function () {
    function backgroundCells(start, end, div, size) {
        this.start = start;
        this.end = end;
        this.size = size;
        for (var i = this.start; i < this.end; i++) {
            var backgroundCell = document.createElement(div);
            var randomImage = Math.floor(Math.random() * 15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random() * window.innerHeight);
            var randomAnimationSpeed = i;
            backgroundCell.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + this.size + ".png\")";
            backgroundCell.style.left = positionX + "px";
            backgroundCell.style.top = randomPositionY + "px";
            backgroundCell.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s linear infinite";
            document.getElementById("background").appendChild(backgroundCell);
        }
    }
    return backgroundCells;
}());
var GameObject = (function () {
    function GameObject(pos) {
        this.position = pos;
    }
    GameObject.prototype.changeImage = function (image) {
        this.div.style.backgroundImage = (image);
    };
    return GameObject;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(left, right, up, down, pos, playerNumber) {
        _super.call(this, pos);
        this.playerNumber = playerNumber;
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
    Player.prototype.hitsVirus = function (virus) {
        if (this.rectangle.hitsOtherRectangle(virus.rectangle)) {
            console.log("raakt virus");
            return true;
        }
    };
    Player.prototype.getBounds = function () {
        return new Rectangle(this.position, this.width, this.height);
    };
    ;
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, -10);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 10);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(-10, 0);
                switch (this.playerNumber) {
                    case 1:
                        document.getElementById("character1Body").style.transform = "scaleX(-1)";
                        document.getElementById("character1Mouth").style.transform = "scaleX(-1)";
                        document.getElementById("character1Glasses").style.transform = "scaleX(-1)";
                        break;
                    case 2:
                        document.getElementById("character2Body").style.transform = "scaleX(-1)";
                        document.getElementById("character2Mouth").style.transform = "scaleX(-1)";
                        document.getElementById("character2Glasses").style.transform = "scaleX(-1)";
                        break;
                }
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(10, 0);
                switch (this.playerNumber) {
                    case 1:
                        document.getElementById("character1Body").style.transform = "scaleX(1)";
                        document.getElementById("character1Mouth").style.transform = "scaleX(1)";
                        document.getElementById("character1Glasses").style.transform = "scaleX(1)";
                        break;
                    case 2:
                        document.getElementById("character2Body").style.transform = "scaleX(1)";
                        document.getElementById("character2Mouth").style.transform = "scaleX(1)";
                        document.getElementById("character2Glasses").style.transform = "scaleX(1)";
                        break;
                }
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
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
    };
    Player.prototype.move = function () {
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
    };
    Player.prototype.clamp = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };
    return Player;
}(GameObject));
var glassesNumber1 = 1;
var glassesNumber2 = 1;
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(left, right, up, down, pos, playerNumber) {
        _super.call(this, left, right, up, down, pos, playerNumber);
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
                this.glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber1 + ".png')";
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
            case 2:
                this.glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber2 + ".png')";
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
        }
    }
    return Character;
}(Player));
var CharacterSelect = (function () {
    function CharacterSelect(playerCount) {
        var _this = this;
        this.chooseGlasses1 = function () {
            if (glassesNumber1 == 16) {
                glassesNumber1 = 1;
                _this.changeGlasses1();
            }
            else {
                glassesNumber1 += 1;
                _this.changeGlasses1();
            }
        };
        this.chooseGlasses1Prev = function () {
            if (glassesNumber1 == 1) {
                glassesNumber1 = 15;
                _this.changeGlasses1();
            }
            else {
                glassesNumber1 -= 1;
                _this.changeGlasses1();
            }
        };
        this.changeGlasses1 = function () {
            var glasses = document.getElementById("player1Glasses");
            glasses.style.backgroundImage = "url(\"../images/player/glasses" + glassesNumber1 + ".png\")";
        };
        this.chooseGlasses2 = function () {
            if (glassesNumber2 == 16) {
                glassesNumber2 = 1;
                _this.changeGlasses2();
            }
            else {
                glassesNumber2 += 1;
                _this.changeGlasses2();
            }
        };
        this.chooseGlasses2Prev = function () {
            if (glassesNumber2 == 1) {
                glassesNumber2 = 15;
                _this.changeGlasses2();
            }
            else {
                glassesNumber2 -= 1;
                _this.changeGlasses2();
            }
        };
        this.changeGlasses2 = function () {
            var glasses = document.getElementById("player2Glasses");
            glasses.style.backgroundImage = "url(\"../images/player/glasses" + glassesNumber2 + ".png\")";
        };
        this.gameMode(playerCount);
    }
    CharacterSelect.prototype.singleplayer = function () {
        new Level1(1);
    };
    CharacterSelect.prototype.multiplayer = function () {
        new Level1(2);
    };
    CharacterSelect.prototype.gameMode = function (playerCount) {
        if (playerCount == 1) {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background_1 = new Background(1, 1);
            var music = new Music(2);
            var player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "50%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            var player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            var player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber1 + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            var controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "46%";
            var arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "48.6%";
            arrowUpButton.style.backgroundImage = "url('../images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.top = "60.1%";
            arrowRightButton.style.left = "51.5%";
            arrowRightButton.style.backgroundImage = "url('../images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id", "arrowUpButton");
            var arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.top = "60.1%";
            arrowDownButton.style.left = "48.5%";
            arrowDownButton.style.backgroundImage = "url('../images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id", "arrowDownButton");
            var arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.top = "60%";
            arrowLeftButton.style.left = "45.6%";
            arrowLeftButton.style.backgroundImage = "url('../images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var buttonRight_1 = document.createElement("chooseButtonRight");
            buttonRight_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight_1.style.cursor = "pointer";
            buttonRight_1.style.width = "82px";
            buttonRight_1.style.height = "110px";
            buttonRight_1.style.transform = "scale(" + -1 + ")";
            buttonRight_1.style.top = "30%";
            buttonRight_1.style.left = "60%";
            buttonRight_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight_1);
            buttonRight_1.setAttribute("id", "buttonRight");
            document.getElementById("buttonRight").addEventListener("click", this.chooseGlasses1);
            buttonRight_1.onmouseover = function () {
                buttonRight_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonRight_1.onmouseleave = function () {
                buttonRight_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var buttonLeft_1 = document.createElement("chooseButtonLeft");
            buttonLeft_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft_1.style.cursor = "pointer";
            buttonLeft_1.style.width = "80px";
            buttonLeft_1.style.height = "110px";
            buttonLeft_1.style.top = "30%";
            buttonLeft_1.style.left = "40%";
            buttonLeft_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft_1);
            buttonLeft_1.setAttribute("id", "buttonLeft");
            document.getElementById("buttonLeft").addEventListener("click", this.chooseGlasses1Prev);
            buttonLeft_1.onmouseover = function () {
                buttonLeft_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonLeft_1.onmouseleave = function () {
                buttonLeft_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('../images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "47.5%";
            startButton.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.singleplayer);
            startButton.onmouseover = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton-hover.png\")";
            };
            startButton.onmouseleave = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton.png\")";
            };
        }
        else {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1, 1);
            var music = new Music(2);
            var player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "75%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            var player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            var player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber1 + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            var buttonRight1_1 = document.createElement("chooseButtonRight1");
            buttonRight1_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight1_1.style.cursor = "pointer";
            buttonRight1_1.style.width = "82px";
            buttonRight1_1.style.height = "110px";
            buttonRight1_1.style.transform = "scale(" + -1 + ")";
            buttonRight1_1.style.top = "30%";
            buttonRight1_1.style.left = "85%";
            buttonRight1_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight1_1);
            buttonRight1_1.setAttribute("id", "buttonRight1");
            document.getElementById("buttonRight1").addEventListener("click", this.chooseGlasses1);
            buttonRight1_1.onmouseover = function () {
                buttonRight1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonRight1_1.onmouseleave = function () {
                buttonRight1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var buttonLeft1_1 = document.createElement("chooseButtonLeft1");
            buttonLeft1_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft1_1.style.cursor = "pointer";
            buttonLeft1_1.style.width = "80px";
            buttonLeft1_1.style.height = "110px";
            buttonLeft1_1.style.top = "30%";
            buttonLeft1_1.style.left = "65%";
            buttonLeft1_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft1_1);
            buttonLeft1_1.setAttribute("id", "buttonLeft1");
            document.getElementById("buttonLeft1").addEventListener("click", this.chooseGlasses1Prev);
            buttonLeft1_1.onmouseover = function () {
                buttonLeft1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonLeft1_1.onmouseleave = function () {
                buttonLeft1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var player2 = document.createElement("choosePlayer2");
            player2.setAttribute("id", "choosePlayer2");
            player2.style.backgroundImage = "url('../images/player/player.png')";
            player2.style.width = "200px";
            player2.style.height = "200px";
            player2.style.top = "25%";
            player2.style.left = "25%";
            player2.style.marginLeft = "-100px";
            player2.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player2);
            var player2Mouth = document.createElement("player2Mouth");
            player2Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player2Mouth.style.width = "200px";
            player2Mouth.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Mouth);
            var player2Glasses = document.createElement("player2Glasses");
            player2Glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber2 + ".png')";
            player2Glasses.style.width = "200px";
            player2Glasses.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Glasses);
            player2Glasses.setAttribute("id", "player2Glasses");
            var controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "71%";
            var controllers2 = document.createElement('controllers2');
            controllers2.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers2.style.width = "300px";
            controllers2.style.height = "123px";
            document.getElementById("background").appendChild(controllers2);
            controllers2.style.top = "45%";
            controllers2.style.left = "21%";
            var arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "73.6%";
            arrowUpButton.style.backgroundImage = "url('../images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.top = "60.1%";
            arrowRightButton.style.left = "76.5%";
            arrowRightButton.style.backgroundImage = "url('../images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id", "arrowUpButton");
            var arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.top = "60.1%";
            arrowDownButton.style.left = "73.5%";
            arrowDownButton.style.backgroundImage = "url('../images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id", "arrowDownButton");
            var arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.top = "60%";
            arrowLeftButton.style.left = "70.6%";
            arrowLeftButton.style.backgroundImage = "url('../images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var wButton = document.createElement('wButton');
            wButton.style.height = "115px";
            wButton.style.width = "115px";
            wButton.style.top = "54.3%";
            wButton.style.left = "23.6%";
            wButton.style.backgroundImage = "url('../images/interface/icons/w-button.png')";
            document.getElementById('background').appendChild(wButton);
            wButton.setAttribute("id", "wButton");
            var dButton = document.createElement('dButton');
            dButton.style.height = "115px";
            dButton.style.width = "115px";
            dButton.style.top = "60.1%";
            dButton.style.left = "26.5%";
            dButton.style.backgroundImage = "url('../images/interface/icons/d-button.png')";
            document.getElementById('background').appendChild(dButton);
            dButton.setAttribute("id", "dButton");
            var sButton = document.createElement('sButton');
            sButton.style.height = "115px";
            sButton.style.width = "115px";
            sButton.style.top = "60.1%";
            sButton.style.left = "23.5%";
            sButton.style.backgroundImage = "url('../images/interface/icons/s-button.png')";
            document.getElementById('background').appendChild(sButton);
            sButton.setAttribute("id", "sButton");
            var aButton = document.createElement('aButton');
            aButton.style.height = "115px";
            aButton.style.width = "115px";
            aButton.style.top = "60%";
            aButton.style.left = "20.6%";
            aButton.style.backgroundImage = "url('../images/interface/icons/a-button.png')";
            document.getElementById('background').appendChild(aButton);
            aButton.setAttribute("id", "aButton");
            var buttonRight2_1 = document.createElement("chooseButtonRight1");
            buttonRight2_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight2_1.style.cursor = "pointer";
            buttonRight2_1.style.width = "82px";
            buttonRight2_1.style.height = "110px";
            buttonRight2_1.style.transform = "scale(" + -1 + ")";
            buttonRight2_1.style.top = "30%";
            buttonRight2_1.style.left = "35%";
            buttonRight2_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight2_1);
            buttonRight2_1.setAttribute("id", "buttonRight2");
            document.getElementById("buttonRight2").addEventListener("click", this.chooseGlasses2);
            buttonRight2_1.onmouseover = function () {
                buttonRight2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonRight2_1.onmouseleave = function () {
                buttonRight2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var buttonLeft2_1 = document.createElement("chooseButtonLeft1");
            buttonLeft2_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft2_1.style.cursor = "pointer";
            buttonLeft2_1.style.width = "80px";
            buttonLeft2_1.style.height = "110px";
            buttonLeft2_1.style.top = "30%";
            buttonLeft2_1.style.left = "15%";
            buttonLeft2_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft2_1);
            buttonLeft2_1.setAttribute("id", "buttonLeft2");
            document.getElementById("buttonLeft2").addEventListener("click", this.chooseGlasses2Prev);
            buttonLeft2_1.onmouseover = function () {
                buttonLeft2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonLeft2_1.onmouseleave = function () {
                buttonLeft2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('../images/interface/icons/startButton.png')";
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
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton-hover.png\")";
            };
            startButton.onmouseleave = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton.png\")";
            };
        }
    };
    return CharacterSelect;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(pos) {
        _super.call(this, pos);
    }
    Enemy.prototype.randomPosition = function () {
        var random = Math.floor(Math.random() * 3) + 1;
        if (random == 1) {
            var x = 0;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        }
        else if (random == 2) {
            var x = window.innerWidth - 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        }
        else if (random == 3) {
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = 0;
            return new Vector(x, y);
        }
    };
    Enemy.prototype.hitsLife = function (life) {
        if (this.rectangle.hitsOtherRectangle(life.rectangle)) {
            return true;
        }
    };
    return Enemy;
}(GameObject));
var Game = (function () {
    function Game() {
        new Titlescreen();
    }
    return Game;
}());
var Level1 = (function () {
    function Level1(playerCount) {
        this.lifes = new Array();
        this.viruses = new Array();
        this.virusCount = 0;
        this.scoreCount = 0;
        this.enemy = new Enemy(new Vector(0, 0));
        this.playerCount = playerCount;
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        var background = new Background(1, 1);
        this.score = document.createElement("score");
        this.score.innerHTML = "" + this.scoreCount;
        this.score.style.marginLeft = "50%";
        this.score.style.width = "100px";
        this.score.style.height = "50px";
        this.score.style.fontSize = "70px";
        this.score.style.color = "white";
        document.body.appendChild(this.score);
        this.spawnTime = 2000;
        if (playerCount == 1) {
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }
            this.spawnTimer(this.spawnVirus, this.spawnTime);
            this.char1 = new Character(37, 39, 38, 40, new Vector(500, 500), 1);
        }
        else {
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }
            this.timer = setInterval(this.spawnVirus.bind(this), 750);
            this.char1 = new Character(37, 39, 38, 40, new Vector(1500, 1500), 1);
            this.char2 = new Character(65, 68, 87, 83, new Vector(1500, 1500), 2);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Level1.prototype.spawnVirus = function () {
        this.viruses.push(new Virus(this.virusCount, this.enemy.randomPosition()));
        this.virusCount++;
        if (this.spawnTime > 200) {
            this.spawnTime = this.spawnTime - 10;
        }
        console.log("dit is de spawntime " + this.spawnTime);
        console.log(this.virusCount);
        clearInterval(this.timer);
        this.spawnTimer(this.spawnVirus, this.spawnTime);
    };
    Level1.prototype.spawnTimer = function (spawnVirus, time) {
        this.timer = setInterval(this.spawnVirus.bind(this), this.spawnTime);
    };
    Level1.prototype.gameLoop = function () {
        if (this.playerCount == 1) {
            this.char1.move();
        }
        else {
            this.char1.move();
            this.char2.move();
        }
        for (var _i = 0, _a = this.lifes; _i < _a.length; _i++) {
            var life_1 = _a[_i];
            life_1.draw();
            life_1.move();
        }
        for (var i = 0; i < this.viruses.length; i++) {
            var random = Math.floor(Math.random() * this.lifes.length);
            if (this.lifes.length == 0) {
                this.viruses.splice(0, this.viruses.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new Titlescreen();
            }
            else {
                this.viruses[i].move(this.lifes[random]);
                if (this.viruses[i].hitsLife(this.lifes[random]) == true) {
                    var life = document.getElementById("" + this.lifes[random].id);
                    life.remove();
                    this.lifes.splice(random, 1);
                }
            }
            if (this.viruses[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                console.log("hitbox detected");
                this.viruses[i].changeImage("url(\"../images/characters/virus2.png\")");
            }
            else {
                this.viruses[i].changeImage("url(\"../images/characters/virus1.png\")");
            }
            if (this.playerCount == 1) {
                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                }
            }
            else {
                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle) || this.viruses[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                }
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Level1;
}());
var Life = (function () {
    function Life(id) {
        this.id = id;
        this.div = document.createElement("redBloodCell");
        this.div.setAttribute("id", "" + this.id);
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.width = 75;
        this.height = 75;
    }
    Life.prototype.randomPosition = function () {
        var x = Math.floor(Math.random() * 1280) + 640;
        var y = Math.floor(Math.random() * 897) + 449;
        return new Vector(x, y);
    };
    Life.prototype.move = function () {
        this.rectangle = new Rectangle(this.position, 75, 75);
    };
    Life.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    };
    return Life;
}());
window.addEventListener("load", function () {
    new Game();
});
var Music = (function () {
    function Music(musicNumber) {
        this.musicLoop(musicNumber);
    }
    Music.prototype.musicLoop = function (musicNumber) {
        var audio = document.createElement("audio");
        audio.src = "../audio/music" + musicNumber + ".mp3";
        audio.loop = true;
        audio.play();
        document.getElementById("background").appendChild(audio);
    };
    return Music;
}());
var Rectangle = (function () {
    function Rectangle(pos, w, h) {
        this.position = pos;
        this.width = w;
        this.height = h;
    }
    Rectangle.prototype.hitsPoint = function (posx, posy) {
        var differencex = this.position.x - posx;
        var differencey = this.position.y - posy;
        return Math.abs(differencex) < this.width / 2 && Math.abs(differencey) < this.height / 2;
    };
    Rectangle.prototype.hitsOtherRectangle = function (rec) {
        var differencex = this.position.x - rec.position.x;
        var differencey = this.position.y - rec.position.y;
        return Math.abs(differencex) < this.width / 2 + rec.width / 2 && Math.abs(differencey) < this.height / 2 + rec.height / 2;
    };
    Rectangle.prototype.isInsideRectangle = function (rec) {
        var rx = this.position.x - rec.position.x;
        var ry = this.position.y - rec.position.y;
        return (rx > 0 &&
            rx + this.width < window.innerWidth &&
            ry > 0 &&
            ry + this.height < window.innerHeight);
    };
    return Rectangle;
}());
var Titlescreen = (function () {
    function Titlescreen() {
        var background = new Background(1, 1);
        this.titleAnimation();
        this.createMenu();
        var music = new Music(1);
    }
    Titlescreen.prototype.levelload1 = function () {
        new Level1(1);
    };
    Titlescreen.prototype.levelload2 = function () {
        new Level1(2);
    };
    Titlescreen.prototype.CharacterSelect1 = function () {
        new CharacterSelect(1);
    };
    Titlescreen.prototype.CharacterSelect2 = function () {
        new CharacterSelect(2);
    };
    Titlescreen.prototype.createMenu = function () {
        var player1 = document.createElement("player1");
        player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        player1.style.cursor = "pointer";
        player1.style.width = "472px";
        player1.style.height = "82px";
        player1.style.left = "50%";
        player1.style.top = "50%";
        player1.style.marginLeft = "-259px";
        player1.style.position = "absolute";
        document.getElementById("background").appendChild(player1);
        player1.setAttribute("id", "player1");
        document.getElementById("player1").addEventListener("click", this.CharacterSelect1);
        player1.style.display = "inline-block";
        player1.onmouseover = function () {
            player1.style.backgroundImage = "url(\"../images/interface/icons/1player_hover.png\")";
        };
        player1.onmouseleave = function () {
            player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        };
        player1.style.animation = "menuMove1 20s infinite";
        var player2 = document.createElement("player2");
        player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        player2.style.cursor = "pointer";
        player2.style.width = "519px";
        player2.style.height = "78px";
        player2.style.left = "50%";
        player2.style.top = "60%";
        player2.style.marginLeft = "-259px";
        player2.style.position = "absolute";
        document.getElementById("background").appendChild(player2);
        player2.setAttribute("id", "player2");
        document.getElementById("player2").addEventListener("click", this.CharacterSelect2);
        player2.style.display = "inline-block";
        player2.onmouseover = function () {
            player2.style.backgroundImage = "url(\"../images/interface/icons/2players_hover.png\")";
        };
        player2.onmouseleave = function () {
            player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        };
        player2.style.animation = "menuMove2 20s infinite";
        var achievements = document.createElement("achievement");
        achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        achievements.style.cursor = "pointer";
        achievements.style.width = "594px";
        achievements.style.height = "78px";
        achievements.style.left = "50%";
        achievements.style.top = "70%";
        achievements.style.marginLeft = "-259px";
        achievements.style.position = "absolute";
        document.getElementById("background").appendChild(achievements);
        achievements.style.display = "inline-block";
        achievements.onmouseover = function () {
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties_hover.png\")";
        };
        achievements.onmouseleave = function () {
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        };
        achievements.style.animation = "menuMove3 20s infinite";
    };
    Titlescreen.prototype.titleAnimation = function () {
        var titleChaseFar = document.createElement('titleChaseFar');
        titleChaseFar.setAttribute("id", "titleChaseFar");
        titleChaseFar.style.backgroundImage = "url(\"../images/titlescreen/titleChaseFar.png\")";
        titleChaseFar.style.height = "100px";
        titleChaseFar.style.width = "200px";
        titleChaseFar.style.left = "-200px";
        titleChaseFar.style.top = "30%";
        titleChaseFar.style.position = "absolute";
        titleChaseFar.style.animation = "titleChaseFarMove 15s infinite";
        titleChaseFar.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseFar);
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"../images/titlescreen/title3.png\")";
        title1.style.width = "1066px";
        title1.style.height = "434px";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.getElementById("background").appendChild(title1);
        var titleChaseClose = document.createElement('titleChaseClose');
        var positionX = window.innerWidth;
        titleChaseClose.style.backgroundImage = "url(\"../images/titlescreen/titleChaseClose.png\")";
        titleChaseClose.style.height = "200px";
        titleChaseClose.style.width = "400px";
        titleChaseClose.style.left = positionX + "px";
        titleChaseClose.style.top = "60%";
        titleChaseClose.style.position = "absolute";
        titleChaseClose.style.animation = "titleChaseCloseMove 15s infinite";
        titleChaseClose.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseClose);
    };
    return Titlescreen;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.isOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    Utils.prototype.removePreviousBackground = function () {
        var bg = document.getElementById("background");
        while (bg.hasChildNodes()) {
            bg.removeChild(bg.firstChild);
        }
        bg.remove();
    };
    return Utils;
}());
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    };
    Vector.prototype.difference = function (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    };
    Vector.prototype.scale = function (n) {
        return new Vector(this.x * n, this.y * n);
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.normalize = function () {
        var mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    };
    Vector.reflectX = function (point, x) {
        return new Vector(2 * x - point.x, point.y);
    };
    Vector.reflectY = function (point, y) {
        return new Vector(point.x, 2 * y - point.y);
    };
    return Vector;
}());
var Virus = (function (_super) {
    __extends(Virus, _super);
    function Virus(id, pos) {
        _super.call(this, pos);
        this.id = id;
        this.div = document.createElement("virus");
        this.div.setAttribute("id", "virus" + this.id);
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    }
    Virus.prototype.move = function (life) {
        var random = Math.floor((Math.random() * 3) + 1);
        var direction = life.position.difference(this.position);
        direction = direction.normalize();
        direction = direction.scale(random);
        this.position = this.position.add(direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectangle = new Rectangle(this.position, 75, 75);
        this.hitboxPosition = new Vector(this.position.x - 50, this.position.y - 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300, 300);
    };
    Virus.prototype.remove = function () {
        this.div.remove();
    };
    return Virus;
}(Enemy));
//# sourceMappingURL=main.js.map