/**
 * Virus
 */
class Virus{
    
    private div:HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: Vector;
    public position: Vector;
    
    constructor() {
        
        this.div = document.createElement("virus");
        document.body.appendChild(this.div);
        
        this.position = this.randomPosition();
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
        
        this.speed = new Vector(1,1);
        //this.life = new Life();
        this.width = 150;
        this.height = 150;
    }
    
    
    public move(life: Life){
        // bij diffrence waar je naartoe wilt als eerste
        let direction = life.position.difference(this.position);
        direction = direction.normalize();
        direction = direction.scale(2);
        this.position = this.position.add(direction);
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
    }
    
    
    
    randomPosition(){
        
        let random = Math.floor(Math.random() * 3) + 1;
        if(random == 1){
            var x = 0;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x,y);
        } else if(random == 2){
            var x = window.innerWidth - 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);   
            return new Vector(x,y);  
        } else if(random == 3){
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = 0;
            return new Vector(x,y);
        }       
    }
}