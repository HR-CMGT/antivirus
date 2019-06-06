class CharacterSelect {
    
    public utils:Utils;
    private game: Game;
    //public glassesNumber1:number;
    private buttonListener : EventListener
    private delay : number = 30
    private playerCount : number = 0
    buttonRight: HTMLElement;
    buttonLeft: HTMLElement;
    buttonLeft1: HTMLElement;
    buttonLeft2: HTMLElement;
    buttonRight1: HTMLElement;
    buttonRight2: HTMLElement;


    constructor(game: Game, playerCount:number){
        this.game = game
        this.playerCount = playerCount
        this.gameMode(playerCount);

        if (playerCount == 1) {
            this.buttonListener = () => this.singleplayer()    
        } else {
            this.buttonListener = () => this.multiplayer()    
        }

        document.addEventListener("joystick0button0", this.buttonListener)
        document.addEventListener("joystick1button0", this.buttonListener)
    }
    
    public singleplayer(){
        document.removeEventListener("joystick0button0", this.buttonListener)
        document.removeEventListener("joystick1button0", this.buttonListener)
        new Level1(this.game, 1);
    }
    
    public multiplayer(){
        document.removeEventListener("joystick0button0", this.buttonListener)
        document.removeEventListener("joystick1button0", this.buttonListener)
        new Level1(this.game, 2);
    }
    
    update() {
        this.game.Arcade.Joysticks.forEach(j => j.update())
        
        let player1 = this.game.Arcade.Joysticks[0]
        let player2 = this.game.Arcade.Joysticks[1]

        if(player1) {
            if(player1.Left)    { 
                if(this.playerCount == 1)
                    this.buttonLeft.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                else {
                    this.buttonLeft1.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                }
                if(this.delay >= 30) {
                    this.chooseGlasses1Prev() 
                    this.delay = 0
                }
            }
            else if(player1.Right)   {
                if(this.playerCount == 1)
                    this.buttonRight.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                else {
                    this.buttonRight1.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                }
                if(this.delay >= 30) { 
                    this.chooseGlasses1() 
                    this.delay = 0
                }
            } else {
                if(this.playerCount == 1) {
                    this.buttonLeft.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                    this.buttonRight.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                } else {
                    this.buttonLeft1.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                    this.buttonRight1.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                }
            }
        }

        if(player2 && this.playerCount ==  2) {
            if(player2.Left)    { 
                this.buttonLeft2.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                if(this.delay >= 30) {
                    this.chooseGlasses2Prev() 
                    this.delay = 0
                }
            }
            else if(player2.Right)   {
                this.buttonRight2.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
                if(this.delay >= 30) { 
                    this.chooseGlasses2() 
                    this.delay = 0
                }
            } else {
                this.buttonLeft2.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
                this.buttonRight2.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            }
        }
        this.delay++
    }

    gameMode(playerCount){
        if(playerCount == 1){
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            let background = new Background(1,1,false);
            var music = new Music(2);
            
            // Create image for player 1
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "50%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            
            // Create mouth for player 1
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            
            // Create sunglasses for player 1
            let player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('images/player/glasses"+glassesNumber1+".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");

            //Instructions buttons
            let controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            controllers.style.marginLeft = "-150px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "50%";

            let arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.marginLeft = "-57.5px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "50%";
            arrowUpButton.style.backgroundImage = "url('images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id","arrowUpButton");
            
            let arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.marginLeft = "-57.5px";
            arrowRightButton.style.top = "64%";
            arrowRightButton.style.left = "55.2%";
            arrowRightButton.style.backgroundImage = "url('images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id","arrowUpButton");

            
            let arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.marginLeft = "-57.5px";
            arrowDownButton.style.top = "64%";
            arrowDownButton.style.left = "50%";
            arrowDownButton.style.backgroundImage = "url('images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id","arrowDownButton");
            
            let arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.marginLeft = "-57.5px";
            arrowLeftButton.style.top = "64%";
            arrowLeftButton.style.left = "45%";
            arrowLeftButton.style.backgroundImage = "url('images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id","arrowUpButton");

            // Choose glasses
            this.buttonRight = document.createElement("chooseButtonRight");
            this.buttonRight.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonRight.style.cursor = "pointer";
            this.buttonRight.style.width = "82px";
            this.buttonRight.style.height = "110px";
            this.buttonRight.style.transform = "scale("+ -1 +")";
            this.buttonRight.style.top = "30%";
            this.buttonRight.style.left = "60%";
            this.buttonRight.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonRight);
            this.buttonRight.setAttribute("id", "buttonRight");
            document.getElementById("buttonRight").addEventListener("click", this.chooseGlasses1);
            // this.buttonRight.onmouseover=function(){
            //     this.buttonRight.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
            // }
            // this.buttonRight.onmouseleave=function(){
            //     this.buttonRight.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            // }
            
            this.buttonLeft = document.createElement("chooseButtonLeft");
            this.buttonLeft.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonLeft.style.cursor = "pointer";
            this.buttonLeft.style.width = "80px";
            this.buttonLeft.style.height = "110px";
            this.buttonLeft.style.top = "30%";
            this.buttonLeft.style.left = "40%";
            this.buttonLeft.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonLeft);
            this.buttonLeft.setAttribute("id", "buttonLeft");
            document.getElementById("buttonLeft").addEventListener("click", this.chooseGlasses1Prev);
            // this.buttonLeft.onmouseover=function(){
            //     this.buttonLeft.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
            // }
            // this.buttonLeft.onmouseleave=function(){
            //     this.buttonLeft.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            // }

            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "50%";
            startButton.style.marginLeft = "-142.5px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.singleplayer);
            startButton.onmouseover=function(){
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton-hover.png\")";
            }
            startButton.onmouseleave=function(){
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton.png\")";
            }
        }
        
        else{
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1,1,false);
            var music = new Music(2);
            
            // Create image for player 1
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "75%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            
            // Create mouth for player 1
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            
            // Create sunglasses for player 1
            let player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('images/player/glasses"+glassesNumber1+".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
                        
            this.buttonRight1 = document.createElement("chooseButtonRight1");
            this.buttonRight1.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonRight1.style.cursor = "pointer";
            this.buttonRight1.style.width = "82px";
            this.buttonRight1.style.height = "110px";
            this.buttonRight1.style.transform = "scale("+ -1 +")";
            this.buttonRight1.style.top = "30%";
            this.buttonRight1.style.left = "85%";
            this.buttonRight1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonRight1);
            this.buttonRight1.setAttribute("id", "buttonRight1");
            document.getElementById("buttonRight1").addEventListener("click", this.chooseGlasses1);
            // this.buttonRight1.onmouseover=function(){
            //     this.buttonRight1.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
            // }
            // this.buttonRight1.onmouseleave=function(){
            //     this.buttonRight1.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            // }
            
            this.buttonLeft1 = document.createElement("chooseButtonLeft1");
            this.buttonLeft1.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonLeft1.style.cursor = "pointer";
            this.buttonLeft1.style.width = "80px";
            this.buttonLeft1.style.height = "110px";
            this.buttonLeft1.style.top = "30%";
            this.buttonLeft1.style.left = "65%";
            this.buttonLeft1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonLeft1);
            this.buttonLeft1.setAttribute("id", "buttonLeft1");
            document.getElementById("buttonLeft1").addEventListener("click", this.chooseGlasses1Prev);
            // this.buttonLeft1.onmouseover=function(){
            //     this.buttonLeft1.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
            // }
            // this.buttonLeft1.onmouseleave=function(){
            //     this.buttonLeft1.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            // }

            // Create image for player 2
            let player2 = document.createElement("choosePlayer2");
            player2.setAttribute("id", "choosePlayer2");
            player2.style.backgroundImage = "url('images/player/player.png')";
            player2.style.width = "200px";
            player2.style.height = "200px";
            player2.style.top = "25%";
            player2.style.left = "25%";
            player2.style.marginLeft = "-100px";
            player2.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player2);
            
            // Create mouth for player 2
            let player2Mouth = document.createElement("player2Mouth");
            player2Mouth.style.backgroundImage = "url('images/player/mouth1.png')";
            player2Mouth.style.width = "200px";
            player2Mouth.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Mouth);
            
            // Create sunglasses for player 2
            let player2Glasses = document.createElement("player2Glasses");
            player2Glasses.style.backgroundImage = "url('images/player/glasses"+glassesNumber2+".png')";
            player2Glasses.style.width = "200px";
            player2Glasses.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Glasses);
            player2Glasses.setAttribute("id", "player2Glasses");
            
            //Instructions buttons
            let controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "68%";

            let controllers2 = document.createElement('controllers2');
            controllers2.style.backgroundImage = "url('images/interface/icons/controllers.png')";
            controllers2.style.width = "300px";
            controllers2.style.height = "123px";
            document.getElementById("background").appendChild(controllers2);
            controllers2.style.top = "45%";
            controllers2.style.left = "18%";

            let arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "72.6%";
            arrowUpButton.style.backgroundImage = "url('images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id","arrowUpButton");
            
            let arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.top = "64.1%";
            arrowRightButton.style.left = "77.5%";
            arrowRightButton.style.backgroundImage = "url('images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id","arrowUpButton");

            
            let arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.top = "64.1%";
            arrowDownButton.style.left = "72.5%";
            arrowDownButton.style.backgroundImage = "url('images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id","arrowDownButton");
            
            let arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.top = "64.1%";
            arrowLeftButton.style.left = "67.7%";
            arrowLeftButton.style.backgroundImage = "url('images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id","arrowUpButton");

            let wButton = document.createElement('wButton');
            wButton.style.height = "115px";
            wButton.style.width = "115px";
            wButton.style.top = "54.3%";
            wButton.style.left = "22.1%";
            wButton.style.backgroundImage = "url('images/interface/icons/w-button.png')";
            document.getElementById('background').appendChild(wButton);
            wButton.setAttribute("id","wButton");
            
            let dButton = document.createElement('dButton');
            dButton.style.height = "115px";
            dButton.style.width = "115px";
            dButton.style.top = "64.1%";
            dButton.style.left = "27%";
            dButton.style.backgroundImage = "url('images/interface/icons/d-button.png')";
            document.getElementById('background').appendChild(dButton);
            dButton.setAttribute("id","dButton");
            
            let sButton = document.createElement('sButton');
            sButton.style.height = "115px";
            sButton.style.width = "115px";
            sButton.style.top = "64.1%";
            sButton.style.left = "22.1%";
            sButton.style.backgroundImage = "url('images/interface/icons/s-button.png')";
            document.getElementById('background').appendChild(sButton);
            sButton.setAttribute("id","sButton");
            
            let aButton = document.createElement('aButton');
            aButton.style.height = "115px";
            aButton.style.width = "115px";
            aButton.style.top = "64.1%";
            aButton.style.left = "17.2%";
            aButton.style.backgroundImage = "url('images/interface/icons/a-button.png')";
            document.getElementById('background').appendChild(aButton);
            aButton.setAttribute("id","aButton");
           
            this.buttonRight2 = document.createElement("chooseButtonRight1");
            this.buttonRight2.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonRight2.style.cursor = "pointer";
            this.buttonRight2.style.width = "82px";
            this.buttonRight2.style.height = "110px";
            this.buttonRight2.style.transform = "scale("+ -1 +")";
            this.buttonRight2.style.top = "30%";
            this.buttonRight2.style.left = "35%";
            this.buttonRight2.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonRight2);
            this.buttonRight2.setAttribute("id", "buttonRight2");
            document.getElementById("buttonRight2").addEventListener("click", this.chooseGlasses2);
            // this.buttonRight2.onmouseover=function(){
            //     this.buttonRight2.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
            // }
            // this.buttonRight2.onmouseleave=function(){
            //     this.buttonRight2.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            // }
            
            this.buttonLeft2 = document.createElement("chooseButtonLeft1");
            this.buttonLeft2.style.backgroundImage = "url('images/interface/icons/arrow.png')";
            this.buttonLeft2.style.cursor = "pointer";
            this.buttonLeft2.style.width = "80px";
            this.buttonLeft2.style.height = "110px";
            this.buttonLeft2.style.top = "30%";
            this.buttonLeft2.style.left = "15%";
            this.buttonLeft2.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(this.buttonLeft2);
            this.buttonLeft2.setAttribute("id", "buttonLeft2");
            document.getElementById("buttonLeft2").addEventListener("click", this.chooseGlasses2Prev);
            // this.buttonLeft2.onmouseover=function(){
            //     this.buttonLeft2.style.backgroundImage = "url(\"images/interface/icons/arrow-hover.png\")";
            // }
            // this.buttonLeft2.onmouseleave=function(){
            //     this.buttonLeft2.style.backgroundImage = "url(\"images/interface/icons/arrow.png\")";
            // }

            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "47%";
            startButton.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.multiplayer);
            startButton.onmouseover=function(){
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton-hover.png\")";
            }
            startButton.onmouseleave=function(){
                startButton.style.backgroundImage = "url(\"images/interface/icons/startButton.png\")";
            }
        }
        
        
        
    }
    
    chooseGlasses1 = () => {
       if(glassesNumber1 == 16){
           glassesNumber1 = 1;
           this.changeGlasses1();
       } else {
           glassesNumber1 += 1;
           this.changeGlasses1();
       }
    } 

    chooseGlasses1Prev  = () => {
        if(glassesNumber1 == 1){
            glassesNumber1 = 15;
            this.changeGlasses1();
        }
        else{
            glassesNumber1 -= 1;
            this.changeGlasses1();
        }
    }
    
    changeGlasses1 = () => { 
        
        var glasses = document.getElementById("player1Glasses");
        glasses.style.backgroundImage = "url(\"images/player/glasses"+glassesNumber1+".png\")";
    }
    
    chooseGlasses2 = () => {
       if(glassesNumber2 == 16){
           glassesNumber2 = 1;
           this.changeGlasses2();
       } else {
           glassesNumber2 += 1;
           this.changeGlasses2();
       }
    } 

    chooseGlasses2Prev  = () => {
        if(glassesNumber2 == 1){
            glassesNumber2 = 15;
            this.changeGlasses2();
        }
        else{
            glassesNumber2 -= 1;
            this.changeGlasses2();
        }
    } 
    
    changeGlasses2 = () => { 
        
        var glasses = document.getElementById("player2Glasses");
        glasses.style.backgroundImage = "url(\"images/player/glasses"+glassesNumber2+".png\")";
    }
            
}
