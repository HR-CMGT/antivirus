//Create titlescreen with background, title & audio
class Titlescreen {
    
    private player1 : HTMLElement
    private player2 : HTMLElement
    private mode : number = 1
    private game : Game
    private buttonListener : EventListener
    private characterSelect: CharacterSelect;

    constructor(game : Game){
        this.game = game

        new Background(1,1,false);
        this.titleAnimation();
        this.createMenu();
        var music = new Music(1); 
        // document.getElementsByTagName("player1").addEventListener("click", this.levelload);
        this.player1.style.backgroundImage = "url(\"../images/interface/icons/1player_hover.png\")"

        this.buttonListener = (e:Event) => this.CharacterSelect(e as CustomEvent)
        
        this.player1.addEventListener("click", this.buttonListener)
        this.player2.addEventListener("click", this.buttonListener)
        document.addEventListener("joystick0button0", this.buttonListener)
        document.addEventListener("joystick1button0", this.buttonListener)
    }
    
    update() {
        this.game.Arcade.Joysticks.forEach(j => {
            j.update()

            if(j.Up) {
                this.player1.style.backgroundImage = "url(\"../images/interface/icons/1player_hover.png\")"
                this.player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
                this.mode = 1
            }
            if(j.Down) {
                this.player2.style.backgroundImage = "url(\"../images/interface/icons/2players_hover.png\")"
                this.player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
                this.mode = 2
            }
        });
        if(this.characterSelect) this.characterSelect.update()
    }

    public levelload1(){
        new Level1(this.game, 1);
    }
    
    public levelload2(){
        new Level1(this.game, 2);
    }
    
    public CharacterSelect(e : CustomEvent){
        document.removeEventListener("joystick0button0", this.buttonListener)
        document.removeEventListener("joystick1button0", this.buttonListener)
        this.characterSelect = new CharacterSelect(this.game, this.mode);
    }
    
    
    createMenu(){
        
        //Create 1 player button
        this.player1 = document.createElement("player1");
        this.player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        this.player1.style.cursor = "pointer";
        this.player1.style.width = "472px";
        this.player1.style.height = "82px";
        this.player1.style.left = "50%";
        this.player1.style.top = "50%";
        this.player1.style.marginLeft = "-259px";
        this.player1.style.position = "absolute";
        document.getElementById("background").appendChild(this.player1);
        this.player1.setAttribute("id", "player1");
        // document.getElementById("player1").addEventListener("click", this.CharacterSelect1);
        this.player1.style.display = "inline-block";
        
        this.player1.style.animation = "menuMove1 20s infinite";
        
        //Create 2 player button
        this.player2 = document.createElement("player2");
        this.player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        this.player2.style.cursor = "pointer";
        this.player2.style.width = "519px";
        this.player2.style.height = "78px";
        this.player2.style.left = "50%";
        this.player2.style.top = "60%";
        this.player2.style.marginLeft = "-259px";
        this.player2.style.position = "absolute";
        document.getElementById("background").appendChild(this.player2);
        this.player2.setAttribute("id", "player2");
        // document.getElementById("player2").addEventListener("click", this.CharacterSelect2);
        this.player2.style.display = "inline-block";
        
        this.player2.style.animation = "menuMove2 20s infinite";
        
        //Create achievements button
        var achievements = document.createElement("achievement");
        achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        achievements.style.cursor = "pointer";
        achievements.style.width = "594px";
        achievements.style.height = "78px";
        achievements.style.left = "50%";
        achievements.style.top = "70%";
        achievements.style.marginLeft = "-259px";
        achievements.style.position = "absolute";
        // document.getElementById("background").appendChild(achievements);
        achievements.style.display = "inline-block";
        achievements.onmouseover=function(){
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties_hover.png\")"
        }
        achievements.onmouseleave=function(){
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        }
        achievements.style.animation = "menuMove3 20s infinite";
    }
    
    titleAnimation(){    
        
        //Create far range image with animation (white cell chase)
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
            
        //Create mid range title image with animation
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"../images/titlescreen/title3.png\")";
        title1.style.width = "1066px";
        title1.style.height = "434px";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.getElementById("background").appendChild(title1);
        
        //Create close range image with animation (white cell chase)
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
        
    } 
}