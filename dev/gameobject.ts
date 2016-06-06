/**
 * GameObject
 */


class GameObject {
    
    public position:Vector;
    public speed:Vector;
    
    constructor(pos:Vector) {
        this.position = pos;
        console.log(this.position);
    }
}