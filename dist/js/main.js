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
        background.style.width = "100%";
        background.style.height = "100%";
    };
    Background.prototype.backLayer = function (backLayerImage) {
        var backLayer = document.createElement("backLayer");
        backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".png\")";
        backLayer.style.width = "100%";
        backLayer.style.height = "100%";
        backLayer.style.backgroundSize = "cover";
        document.getElementById("background").appendChild(backLayer);
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
            document.getElementById("background").appendChild(backgroundCellSmall);
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
            document.getElementById("background").appendChild(backgroundCellMedium);
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
            document.getElementById("background").appendChild(backgroundCellLarge);
        }
    };
    Background.prototype.frontLayer = function (frontLayerImage) {
        var frontLayer = document.createElement("frontLayer");
        frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
        frontLayer.style.width = "100%";
        frontLayer.style.height = "100%";
        frontLayer.style.backgroundSize = "cover";
        document.getElementById("background").appendChild(frontLayer);
    };
    return Background;
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
var Level1 = (function () {
    function Level1(playerCount) {
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        var background = new Background(1, 1);
        if (playerCount == 1) {
            this.char1 = new WhiteBloodCell(37, 39, 38, 40);
        }
        else {
            this.char1 = new WhiteBloodCell(37, 39, 38, 40);
            this.char2 = new WhiteBloodCell(65, 68, 87, 83);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Level1.prototype.gameLoop = function () {
        this.char1.move();
        this.char2.move();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Level1;
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
        console.log("De hoogte is " + window.innerHeight);
        console.log("De breedte is " + window.innerWidth);
    }
    WhiteBloodCell.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 15;
                console.log("De Y is " + this.y);
                this.checkCollision("upkey");
                break;
            case this.downkey:
                this.downSpeed = 15;
                console.log("De Y is " + this.y);
                this.checkCollision("downkey");
                break;
            case this.leftkey:
                this.leftSpeed = 15;
                console.log("De X is " + this.x);
                this.checkCollision("leftkey");
                this.div.style.backgroundImage = "url('../images/player/player-look-right.png')";
                break;
            case this.rightkey:
                this.rightSpeed = 15;
                console.log("De X is " + this.x);
                this.checkCollision("rightkey");
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
    WhiteBloodCell.prototype.checkCollision = function (keyCode) {
        if (keyCode == "upkey") {
            if (this.y <= 0) {
                this.upSpeed = 0;
            }
        }
        if (keyCode == "downkey") {
            if (this.y >= window.innerHeight - this.height) {
                this.downSpeed = 0;
            }
        }
        if (keyCode == "leftkey") {
            if (this.x <= 0) {
                this.leftSpeed = 0;
            }
        }
        if (keyCode == "rightkey") {
            if (this.x >= window.innerWidth - this.width) {
                this.rightSpeed = 0;
            }
        }
    };
    return WhiteBloodCell;
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
//# sourceMappingURL=main.js.map