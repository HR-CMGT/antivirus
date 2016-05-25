class Level1 {
    
    
    private char1:WhiteBloodCell;
    private char2:WhiteBloodCell;
    private utils:Utils;
       
    
    constructor(playerCount:number){
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        var background = new Background(1,1);
        // var music = new Music(1);
        if(playerCount == 1){
            this.char1 = new WhiteBloodCell(37,39,38,40);
        } else {
            this.char1 = new WhiteBloodCell(37,39,38,40);
            this.char2 = new WhiteBloodCell(65,68,87,83);
        }
        
       
        
        
        requestAnimationFrame(this.gameLoop.bind(this));
        
    }
    
    
        
    private gameLoop(){
        this.char1.move();
        this.char2.move();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
}