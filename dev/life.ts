/**
 * Life
 */
class Life {
    
    private div:HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public life: Life;
    
    
    constructor() {
        this.div = document.createElement("redBloodCell");
        document.body.appendChild(this.div);
        
        this.randomPosition();

        this.width = 75;
        this.height = 75;
    }
    
    public spawnLife(amount:number){
        for(let i = 1; i < amount; i++){
            new Life;
        }
    }
    
    randomPosition(){
                        
        let randomX = Math.floor(Math.random() * 500) + (screen.width/2);
        let randomY = Math.floor(Math.random() * 500) + (screen.height/2);  
        
        this.div.style.transform = "translate("+randomX+"%, "+randomY+"%)"
        if(this.x < (screen.width/2)){
            this.div.style.backgroundImage = "url(\"../images/characters/red2.png\")";
        }
    }
}