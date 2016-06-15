/**
 * Life
 */
class Life {
    
    public div:HTMLElement;
    // public x: number;
    // public y: number;
    public width: number;
    public height: number;
    public life: Life;
    public position: Vector;
    public newPosition : Vector;
    public rectangle: Rectangle;
    public newRectangle: Rectangle;
    public id: number;
    
    constructor(id:number) {
        this.id = id;
        this.div = document.createElement("redBloodCell");
        this.div.setAttribute("id", ""+this.id);
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.newPosition = this.randomPosition();

        this.width = 75;
        this.height = 75;
    }
    
    randomPosition(): Vector{
        
        let x = Math.floor(Math.random() * window.innerWidth / 3) + window.innerWidth / 3;
        let y = Math.floor(Math.random() * window.innerHeight / 3) + window.innerHeight / 3; 
        
        return new Vector(x,y);
    }
    
    move() : void{
            this.newRectangle = new Rectangle(this.newPosition, 10, 10);
            this.rectangle = new Rectangle(this.position, 50, 50);  
               
        if(this.rectangle.hitsOtherRectangle(this.newRectangle)){
            this.newPosition = this.randomPosition();
        }
        
        else{
            let direction = this.newPosition.difference(this.position);
            direction = direction.normalize();
            let randomSpeed = Math.floor((Math.random() * 3) + 1);
            direction = direction.scale(randomSpeed);
            this.position = this.position.add(direction);
            this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";

        }
    }
    
    draw() : void {
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
    }
    
    // animationTimer(){
    //     var timer = setInterval(this.move(), 2000);
        
    // }
}