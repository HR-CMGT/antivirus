/// <reference path="player.ts" />
var glassesNumber1 = 1;
var glassesNumber2 = 1;

class Character extends Player{
    
    public characterNumber:number;
    
    public character;
    public body;
    public mouth;
    public glasses;
    
    constructor(left:number, right:number, up:number, down:number, pos:Vector, characterNumber:number){
        super(left, right, up, down, pos);
        
        this.characterNumber = characterNumber;
        
        this.character = document.createElement("character");
        this.character.setAttribute("id", "character" + this.characterNumber);
        document.getElementById("background").appendChild(this.character);
        
        this.body = document.createElement("characterBody");
        this.body.setAttribute("id", "character"+ this.characterNumber +"Body");
        document.getElementById("character" + this.characterNumber).appendChild(this.body);
        
        this.mouth = document.createElement("characterMouth");
        this.mouth.setAttribute("id", "character"+ this.characterNumber +"Mouth");
        document.getElementById("character" + this.characterNumber).appendChild(this.mouth);
        
        this.glasses = document.createElement("characterGlasses");
        this.glasses.setAttribute("id", "character"+ this.characterNumber +"Glasses");
        
        switch(characterNumber){
            case 1:
                this.glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber1+".png')"
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
            case 2:
                this.glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber2+".png')"
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
        }
        
        
        
        
    }
}