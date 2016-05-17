var background1 = (function () {
    function background1() {
        var background1 = document.createElement("background1");
        background1.style.backgroundImage = "url(\"../images/backgrounds/layer1.png\")";
        background1.style.width = "100%";
        background1.style.height = "100%";
        background1.style.backgroundSize = "cover";
        document.body.appendChild(background1);
    }
    return background1;
}());
var background2 = (function () {
    function background2() {
        var background2 = document.createElement("background2");
        background2.style.backgroundImage = "url(\"../images/backgrounds/layer3.png\")";
        background2.style.width = "100%";
        background2.style.height = "100%";
        background2.style.backgroundSize = "cover";
        document.body.appendChild(background2);
    }
    return background2;
}());
var backgroundCells = (function () {
    function backgroundCells() {
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
    return backgroundCells;
}());
function loadBackground() {
    new background1();
    new backgroundCells();
    new background2();
    new titleChaseFar();
    new title1();
    new titleChaseClose();
}
function loadTitleScreen() {
    new titleChaseFar();
    new title1();
    new titleChaseClose();
    new titleAudioTheme();
}
window.addEventListener("load", function () {
    loadBackground();
    loadTitleScreen();
});
var title1 = (function () {
    function title1() {
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"../images/titlescreen/title3.png\")";
        title1.style.width = "100%";
        title1.style.height = "100%";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.body.appendChild(title1);
    }
    return title1;
}());
var titleAudioTheme = (function () {
    function titleAudioTheme() {
        var audio = document.createElement("audio");
        audio.src = "../audio/titlescreen/titlescreenaudiotheme.mp3";
        audio.loop = true;
        audio.play();
        document.body.appendChild(audio);
    }
    return titleAudioTheme;
}());
var titleChaseClose = (function () {
    function titleChaseClose() {
        var positionX = window.innerWidth;
        var titleChaseClose = document.createElement('titleChaseClose');
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
    return titleChaseClose;
}());
var titleChaseFar = (function () {
    function titleChaseFar() {
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
    }
    return titleChaseFar;
}());
//# sourceMappingURL=main.js.map