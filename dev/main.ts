function loadBackground(){
    new background1();
    new backgroundCells();
    new background2();
    new titleChaseFar();
    new title1();
    new titleChaseClose();
    
}

function loadTitleScreen(){
    new titleChaseFar();
    new title1();
    new titleChaseClose();
    new titleAudioTheme();
}

window.addEventListener("load", function() {
    loadBackground();
    loadTitleScreen();
});