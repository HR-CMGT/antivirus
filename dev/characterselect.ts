class CharacterSelect {
    
    public utils:Utils;
    public glassesNumber:number;
    
    constructor(playerCount:number){
        this.glassesNumber = 1;
        this.gameMode(playerCount);

    }
    
    public level1(){
        new Level1(1);
    }
    
    gameMode(playerCount){

        
        if(playerCount == 1){
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            let background = new Background(1,1);
            var music = new Music(2);
            
            
            // Create image for player 1
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "50%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            
            // Create mouth for player 1
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            
            // Create sunglasses for player 1
            let player1Glasses = document.createElement("player1Mouth");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses"+this.glassesNumber+".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            
            let buttonRight = document.createElement("chooseButtonRight");
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
        
        else{
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1,1);
            // var music = new Music(1);
            
            // Create image for player 1
            let player1 = document.createElement("choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "30%";
            player1.style.left = "30%";
            player1.style.marginLeft = "-100px";
            document.body.appendChild(player1);
            
            // Create image for player 2
            let player2 = document.createElement("choosePlayer2");
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
        
    }
    
    chooseGlasses = () => {
       if(this.glassesNumber == 16){
           this.glassesNumber = 1;
           this.changeGlasses();
       } else {
           this.glassesNumber += 1;
           this.changeGlasses();
       }
    }  
    
    changeGlasses = () => { 
        
        var glasses = document.getElementById("player1Glasses");
        glasses.style.backgroundImage = "url(\"../images/player/glasses"+this.glassesNumber+".png\")";
    }
            
}