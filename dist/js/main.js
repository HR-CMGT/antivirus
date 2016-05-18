var Background = (function () {
    function Background(backLayerImage, frontLayerImage) {
        var background1 = backLayer();
        var background2 = midLayer();
        var background3 = frontLayer();
        function backLayer() {
            var backLayer = document.createElement("backLayer");
            backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".png\")";
            backLayer.style.width = "100%";
            backLayer.style.height = "100%";
            backLayer.style.backgroundSize = "cover";
            document.body.appendChild(backLayer);
        }
        function midLayer() {
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
        }
        function frontLayer() {
            var frontLayer = document.createElement("frontLayer");
            frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
            frontLayer.style.width = "100%";
            frontLayer.style.height = "100%";
            frontLayer.style.backgroundSize = "cover";
            document.body.appendChild(frontLayer);
        }
    }
    return Background;
}());
var Game = (function () {
    function Game() {
        new Titlescreen();
    }
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Music = (function () {
    function Music(musicNumber) {
        var music = musicLoop();
        function musicLoop() {
            var audio = document.createElement("audio");
            audio.src = "../audio/titlescreen/music" + musicNumber + ".mp3";
            audio.loop = true;
            audio.play();
            document.body.appendChild(audio);
        }
    }
    return Music;
}());
var Titlescreen = (function () {
    function Titlescreen() {
        var background = new Background(1, 1);
        var title = titleAnimation();
        var music = new Music(1);
        function titleAnimation() {
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
        }
    }
    return Titlescreen;
}());
//# sourceMappingURL=main.js.map