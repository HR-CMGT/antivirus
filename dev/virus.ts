/**
 * Virus
 */
class Virus{
    
    public div:HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: Vector;
    public position: Vector;
    public rectangle: Rectangle;
    public level: Level1;
    public id: number;
    public hitbox: Rectangle;
    public hitboxPosition: Vector;
    
    constructor(id:number) {
        this.id = id;
        this.div = document.createElement("virus");
        this.div.setAttribute("id", "virus"+this.id);
        document.getElementById("background").appendChild(this.div);
        
        this.position = this.randomPosition();
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
        

        
        this.speed = new Vector(1,1);
        //this.life = new Life();
        this.width = 125;
        this.height = 125;
    }
    
    
    public move(life: Life){
        // bij diffrence waar je naartoe wilt als eerste
        let random = Math.floor((Math.random()*3) + 1);
        
        let direction = life.position.difference(this.position);
        direction = direction.normalize();
        direction = direction.scale(random);
        this.position = this.position.add(direction);
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
        this.rectangle = new Rectangle(this.position, 75, 75);
        
        this.hitboxPosition = new Vector(this.position.x - 50, this.position.y - 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300,300);
        console.log(this.hitboxPosition);
        console.log(this.position);
        
    }
    
    public hitsLife(life: Life){
        if(this.rectangle.hitsOtherRectangle(life.rectangle)){
            return true;
    }
    
   
    }
    
    public remove(){
        this.div.remove();    
    }
    
    public changeImage(image: string){
        this.div.style.backgroundImage = (image);
        
    }
    
    public randomPosition(){
        
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