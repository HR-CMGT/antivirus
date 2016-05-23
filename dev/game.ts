//Start the game
class Game {
     
    private char1:WhiteBloodCell;
    
    private utils:Utils;
       
    constructor(){
        new Titlescreen();
        new Levelload();
        this.char1 = new WhiteBloodCell(37, 39, 38, 40);
        this.utils = new Utils();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    private gameLoop(){
        this.char1.move();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
}