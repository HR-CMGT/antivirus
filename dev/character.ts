/// <reference path="player.ts" />


class Character extends Player{
    
    public body;
    public mouth;
    public glasses;
    
    constructor(left, right, up, down, pos){
        super(left, right, up, down, pos);
        
    }
}