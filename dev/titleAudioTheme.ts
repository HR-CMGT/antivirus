class titleAudioTheme {
    constructor(){
        var audio = document.createElement("audio");
        
        audio.src = "../audio/titlescreen/titlescreenaudiotheme.mp3";
        audio.loop = true;
        audio.play();
        document.body.appendChild(audio);
    }
}