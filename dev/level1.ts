class Level1 {
    
         
    private char1:WhiteBloodCell;
    
    private utils:Utils;
       
    
    constructor(){
        this.removePreviousBackground();
        var background = new Background(1,1);
        // var music = new Music(1);
        this.char1 = new WhiteBloodCell(37, 39, 38, 40);
        this.utils = new Utils();
        
        
        requestAnimationFrame(this.gameLoop.bind(this));
        
    }
    
    removePreviousBackground(){
        var bg = document.getElementById("background");
        while (bg.hasChildNodes()) {   
            bg.removeChild(bg.firstChild);
        }
    }     
        
    private gameLoop(){
        this.char1.move();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
}