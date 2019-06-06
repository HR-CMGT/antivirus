//Load music
class Music {
    
    //Choose track by using the parameter
    constructor(musicNumber:number){
        
        this.musicLoop(musicNumber);
    }
    
    musicLoop(musicNumber){
        var audio = document.createElement("audio");
        
        audio.src = "audio/music" + musicNumber + ".mp3";
        document.getElementById("background").appendChild(audio);
        audio.loop = true;
        audio.play();
    }
}