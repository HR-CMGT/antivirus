class Music {
    constructor(musicNumber:number){
        
        var music = loopMusic();
        
        function loopMusic(){
            var audio = document.createElement("audio");
        
            audio.src = "../audio/titlescreen/music" + musicNumber + ".mp3";
            audio.loop = true;
            audio.play();
            document.body.appendChild(audio);
        }
    }
}