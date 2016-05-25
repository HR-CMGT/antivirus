/**
 * Virus
 */
class Virus {
    
    private div:HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public life: Life;
    
    constructor() {
        this.div = document.createElement("virus");
        document.body.appendChild(this.div);

        this.randomPosition();
        this.width = 150;
        this.height = 150;
    }
    
    public spawnVirus(amount:number){
        for(let i = 1; i < amount; i++){
            new Virus;
        }
    }
    
    randomPosition(){
        
        // let randomX = Math.floor(Math.random() * 500) + (screen.width);
        // // let randomX = Math.floor(Math.random());
        // let randomY = Math.floor(Math.random() * 500) + (screen.height/10); 
        let random = Math.floor(Math.random() * 3) + 1;
        if(random == 1){
            var x = 0;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
        } else if(random == 2){
            var x = window.innerWidth - 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);     
        } else if(random == 3){
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = 0;
        }
         
        
       
        this.div.style.transform = "translate("+x+"px, "+y+"px)"

        
    }
}