class Level1 {
    
    
    private char1:Player;
    private char2:Player;
    public playerCount;
    private utils:Utils;
    private lifes: Array<Life> = new Array<Life>();
    private viruses: Array<Virus> = new Array<Virus>();
    
       
    
    constructor(playerCount:number){
        this.playerCount = playerCount;
        
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        
        var background = new Background(1,1);
        // var music = new Music(1);
        if(playerCount == 1){
            
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life());
            }
            
            for (var i = 0; i < 10; i++) {
                this.viruses.push(new Virus());
            }
            this.char1 = new Character(37,39,38,40, new Vector(500,500), 1);

            
        } else {

            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life());
            }
        
            this.char1 = new Character(37,39,38,40, new Vector(1500,1500), 2);
            this.char2 = new Character(65,68,87,83, new Vector(1500,1500), 2);

        }
        
       
        
        
        requestAnimationFrame(this.gameLoop.bind(this));
        
    }
    
    
        
    private gameLoop(){
        if(this.playerCount == 1){
            this.char1.move();
        } else {
            this.char1.move();
            this.char2.move();
        }
        
        for(let life of this.lifes){
            life.draw();
        }
        
        for(let virus of this.viruses) {
            let random = Math.floor(Math.random()*this.lifes.length); 
            virus.move(this.lifes[random]);
            
            
            // virus.move(this.lifes[0]);
            
            
        }
        
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
}