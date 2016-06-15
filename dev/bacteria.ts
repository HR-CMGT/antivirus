/// <reference path="enemy.ts" />


/**
 * Bacteria
 */
class Bacteria extends Enemy{
    
    public id: number;
    public hitbox: Rectangle;
    public hitboxPosition: Vector;
    
    constructor(id: number, pos: Vector) {
        super(pos);
        this.id = id;
        this.div = document.createElement("bacteria");
        this.div.setAttribute("id", "bacteria" + this.id);
        document.getElementById("background").appendChild(this.div);

        this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    }
    
    
}