/**
 * Life
 */
class Life {
    
    private div:HTMLElement;
    // public x: number;
    // public y: number;
    public width: number;
    public height: number;
    public life: Life;
    public position: Vector;
    
    constructor() {
        this.div = document.createElement("redBloodCell");
        document.body.appendChild(this.div);
        this.position = this.randomPosition();
        

        this.width = 75;
        this.height = 75;
    }
    
    randomPosition(): Vector{
                        
        let x = Math.floor(Math.random() * 1280) + 640;//	1920
        let y = Math.floor(Math.random() * 897) + 449; //897 
        // let x = 500;
        // let y = 500;
        
        return new Vector(x,y);
    }
    
    move() : void{

    }
    
    draw() : void {
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
    }
}