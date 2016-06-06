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
var CharacterSelect = (function () {
    function CharacterSelect(playerCount) {
        var _this = this;
        this.chooseGlasses = function () {
            if (_this.glassesNumber == 16) {
                _this.glassesNumber = 1;
                _this.changeGlasses();
            }
            else {
                _this.glassesNumber += 1;
                _this.changeGlasses();
            }
        };
        this.changeGlasses = function () {
            var glasses = document.getElementById("player1Glasses");
            glasses.style.backgroundImage = "url(\"../images/player/glasses" + _this.glassesNumber + ".png\")";
        };
        this.glassesNumber = 1;
        this.gameMode(playerCount);
    }
    CharacterSelect.prototype.level1 = function () {
        new Level1(1);
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
            var player1Glasses = document.createElement("player1Mouth");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses" + this.glassesNumber + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            var buttonRight = document.createElement("chooseButtonRight");
            buttonRight.style.backgroundImage = "url('../images/interface/icons/soundoff.png')";
            buttonRight.style.width = "82px";
            buttonRight.style.height = "83px";
            buttonRight.style.top = "30%";
            buttonRight.style.left = "60%";
            buttonRight.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight);
            buttonRight.setAttribute("id", "buttonRight");
            document.getElementById("buttonRight").addEventListener("click", this.chooseGlasses);
        }
        else {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1, 1);
            var player1 = document.createElement("choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "30%";
            player1.style.left = "30%";
            player1.style.marginLeft = "-100px";
            document.body.appendChild(player1);
            var player2 = document.createElement("choosePlayer2");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "60%";
            player2.style.left = "60%";
            player2.style.marginLeft = "-100px";
            document.body.appendChild(player2);
        }
        var startButton = document.createElement("startButton");
        startButton.style.backgroundImage = "url('../images/interface/icons/settingsicon.png')";
        startButton.style.width = "82px";
        startButton.style.height = "82px";
        startButton.style.top = "80%";
        startButton.style.left = "50%";
        startButton.style.marginLeft = "-41px";
        document.getElementById("background").appendChild(startButton);
        startButton.setAttribute("id", "startButton");
        document.getElementById("startButton").addEventListener("click", this.level1);
    };
    return CharacterSelect;
}());
var Game = (function () {
    function Game() {
        new Titlescreen();
    }
    return Game;
}());
var GameObject = (function () {
    function GameObject(pos) {
        this.position = pos;
    }
    return GameObject;
}());
var Level1 = (function () {
    function Level1(playerCount) {
        this.lifes = new Array();
        this.viruses = new Array();
        this.playerCount = playerCount;
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        var background = new Background(1, 1);
        if (playerCount == 1) {
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life());
            }
            for (var i = 0; i < 10; i++) {
                this.viruses.push(new Virus());
            }
            this.char1 = new WhiteBloodCell(37, 39, 38, 40, new Vector(500, 500));
        }
        else {
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life());
            }
            this.char1 = new WhiteBloodCell(37, 39, 38, 40, new Vector(1500, 1500));
            this.char2 = new WhiteBloodCell(65, 68, 87, 83, new Vector(1500, 1500));
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Level1.prototype.gameLoop = function () {
        if (this.playerCount == 1) {
            this.char1.move();
        }
        else {
            this.char1.move();
            this.char2.move();
        }
        for (var _i = 0, _a = this.lifes; _i < _a.length; _i++) {
            var life = _a[_i];
            life.draw();
        }
        for (var _b = 0, _c = this.viruses; _b < _c.length; _b++) {
            var virus = _c[_b];
            var random = Math.floor(Math.random() * this.lifes.length);
            virus.move(this.lifes[random]);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Level1;
}());
var Life = (function () {
    function Life() {
        this.div = document.createElement("redBloodCell");
        document.body.appendChild(this.div);
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
var WhiteBloodCell = (function (_super) {
    __extends(WhiteBloodCell, _super);
    function WhiteBloodCell(left, right, up, down, pos) {
        _super.call(this, pos);
        this.div = document.createElement("whiteBloodCell");
        document.body.appendChild(this.div);
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
    WhiteBloodCell.prototype.getBounds = function () {
        return new Rectangle(this.position, this.width, this.height);
    };
    ;
    WhiteBloodCell.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, -15);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 15);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(-15, 0);
                this.div.style.backgroundImage = "url('../images/player/player-look-left.png')";
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(15, 0);
                this.div.style.backgroundImage = "url('../images/player/player-look-right.png')";
                break;
        }
    };
    WhiteBloodCell.prototype.onKeyUp = function (event) {
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
    WhiteBloodCell.prototype.move = function () {
        this.position = this.position.add(this.leftSpeed.add(this.rightSpeed));
        this.position = this.position.add(this.upSpeed.add(this.downSpeed));
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.position.x = this.clamp(this.position.x, 0, window.innerWidth - this.width);
        this.position.y = this.clamp(this.position.y, 0, window.innerHeight - this.height);
    };
    WhiteBloodCell.prototype.clamp = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };
    return WhiteBloodCell;
}(GameObject));
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
    Titlescreen.prototype.createMenu = function () {
        var player1 = document.createElement("player1");
        player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
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
        player2.style.width = "519px";
        player2.style.height = "78px";
        player2.style.left = "50%";
        player2.style.top = "60%";
        player2.style.marginLeft = "-259px";
        player2.style.position = "absolute";
        document.getElementById("background").appendChild(player2);
        player2.setAttribute("id", "player2");
        document.getElementById("player2").addEventListener("click", this.levelload2);
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
var Virus = (function () {
    function Virus() {
        this.div = document.createElement("virus");
        document.body.appendChild(this.div);
        this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.speed = new Vector(1, 1);
        this.width = 150;
        this.height = 150;
    }
    Virus.prototype.move = function (life) {
        var direction = life.position.difference(this.position);
        direction = direction.normalize();
        direction = direction.scale(2);
        this.position = this.position.add(direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    };
    Virus.prototype.randomPosition = function () {
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
    return Virus;
}());
//# sourceMappingURL=main.js.map