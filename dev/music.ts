//Load music
class Music {
    
    //Choose track by using the parameter
    constructor(musicNumber:number){
        
        var music = musicLoop();
        
        function musicLoop(){
            var audio = document.createElement("audio");
        
            audio.src = "../audio/titlescreen/music" + musicNumber + ".mp3";
            audio.loop = true;
            audio.play();
            document.body.appendChild(audio);
        }
    }
}