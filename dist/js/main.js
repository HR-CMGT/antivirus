var Background = (function () {
    function Background(backLayerImage, frontLayerImage) {
        this.backLayer(backLayerImage);
        this.midLayer();
        this.frontLayer(frontLayerImage);
    }
    Background.prototype.backLayer = function (backLayerImage) {
        var backLayer = document.createElement("backLayer");
        backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".png\")";
        backLayer.style.width = "100%";
        backLayer.style.height = "100%";
        backLayer.style.backgroundSize = "cover";
        document.body.appendChild(backLayer);
    };
    Background.prototype.midLayer = function () {
        for (var i = 26; i < 36; i++) {
            var randomImage = Math.floor(Math.random() * 15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random() * window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellSmall = document.createElement('backgroundCellSmall');
            backgroundCellSmall.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + "small.png\")";
            backgroundCellSmall.style.height = "25px";
            backgroundCellSmall.style.width = "25px";
            backgroundCellSmall.style.left = positionX + "px";
            backgroundCellSmall.style.top = randomPositionY + "px";
            backgroundCellSmall.style.position = "absolute";
            backgroundCellSmall.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s infinite";
            backgroundCellSmall.style.animationTimingFunction = "linear";
            document.body.appendChild(backgroundCellSmall);
        }
        for (var i = 16; i < 26; i++) {
            var randomImage = Math.floor(Math.random() * 15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random() * window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellMedium = document.createElement('backgroundCellMedium');
            backgroundCellMedium.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + "medium.png\")";
            backgroundCellMedium.style.height = "50px";
            backgroundCellMedium.style.width = "50px";
            backgroundCellMedium.style.left = positionX + "px";
            backgroundCellMedium.style.top = randomPositionY + "px";
            backgroundCellMedium.style.position = "absolute";
            backgroundCellMedium.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s infinite";
            backgroundCellMedium.style.animationTimingFunction = "linear";
            document.body.appendChild(backgroundCellMedium);
        }
        for (var i = 6; i < 16; i++) {
            var randomImage = Math.floor(Math.random() * 15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random() * window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellLarge = document.createElement('backgroundCellLarge');
            backgroundCellLarge.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + "large.png\")";
            backgroundCellLarge.style.height = "75px";
            backgroundCellLarge.style.width = "75px";
            backgroundCellLarge.style.left = positionX + "px";
            backgroundCellLarge.style.top = randomPositionY + "px";
            backgroundCellLarge.style.position = "absolute";
            backgroundCellLarge.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s infinite";
            backgroundCellLarge.style.animationTimingFunction = "linear";
            document.body.appendChild(backgroundCellLarge);
        }
    };
    Background.prototype.frontLayer = function (frontLayerImage) {
        var frontLayer = document.createElement("frontLayer");
        frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
        frontLayer.style.width = "100%";
        frontLayer.style.height = "100%";
        frontLayer.style.backgroundSize = "cover";
        document.body.appendChild(frontLayer);
    };
    return Background;
}());
var Game = (function () {
    function Game() {
        new Titlescreen();
        this.char1 = new WhiteBloodCell(37, 39, 38, 40);
        this.utils = new Utils();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.char1.move();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener("load", function () {
    new WhiteBloodCell(65, 68, 87, 83);
});
window.addEventListener("load", function () {
    new Game();
});
var Music = (function () {
    function Music(musicNumber) {
        this.musicLoop(musicNumber);
    }
    Music.prototype.musicLoop = function (musicNumber) {
        var audio = document.createElement("audio");
        audio.src = "../audio/titlescreen/music" + musicNumber + ".mp3";
        audio.loop = true;
        audio.play();
        document.body.appendChild(audio);
    };
    return Music;
}());
var WhiteBloodCell = (function () {
    function WhiteBloodCell(left, right, up, down) {
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("whiteBloodCell");
        document.body.appendChild(this.div);
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.x = Math.floor(200 + Math.random() * 200);
        this.y = Math.floor(200 + Math.random() * 200);
        this.width = 200;
        this.height = 200;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    WhiteBloodCell.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                if (this.upkey <= 0)
                    this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
            case this.leftkey:
                this.leftSpeed = 5;
                this.div.style.backgroundImage = "url('../images/player/player-look-right.png')";
                break;
            case this.rightkey:
                this.rightSpeed = 5;
                this.div.style.backgroundImage = "url('../images/player/player-look-left.png')";
                break;
        }
    };
    WhiteBloodCell.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    WhiteBloodCell.prototype.move = function () {
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
    };
    WhiteBloodCell.prototype.showHit = function (hit) {
        if (hit) {
            this.div.style.borderColor = "red";
        }
        else {
            this.div.style.borderColor = "greenyellow";
        }
    };
    return WhiteBloodCell;
}());
var Titlescreen = (function () {
    function Titlescreen() {
        var background = new Background(1, 1);
        this.titleAnimation();
        var music = new Music(1);
    }
    Titlescreen.prototype.titleAnimation = function () {
        var titleChaseFar = document.createElement('titleChaseFar');
        titleChaseFar.style.backgroundImage = "url(\"../images/titlescreen/titleChaseFar.png\")";
        titleChaseFar.style.height = "100px";
        titleChaseFar.style.width = "200px";
        titleChaseFar.style.left = "-200px";
        titleChaseFar.style.top = "30%";
        titleChaseFar.style.position = "absolute";
        titleChaseFar.style.animation = "titleChaseFarMove 15s infinite";
        titleChaseFar.style.animationTimingFunction = "linear";
        document.body.appendChild(titleChaseFar);
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"../images/titlescreen/title3.png\")";
        title1.style.width = "100%";
        title1.style.height = "100%";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.body.appendChild(title1);
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
        document.body.appendChild(titleChaseClose);
    };
    return Titlescreen;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.isOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map