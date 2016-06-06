class Level1 {
    
    
    private char1:Player;
    private char2:Player;
    public playerCount;
    private utils:Utils;
    public life:Life;
    public virus:Virus;
       
    
    constructor(playerCount:number){
        this.playerCount = playerCount;
        this.utils = new Utils();
        
        this.utils.removePreviousBackground();
        var background = new Background(1,1);
        // var music = new Music(1);
        if(playerCount == 1){
            
            this.life = new Life();
            this.life.spawnLife(10);
            this.virus = new Virus();
            this.virus.spawnVirus(10);
            this.char1 = new Character(37,39,38,40, new Vector(500,500), 1);

            
        } else {

            this.life = new Life();
            this.life.spawnLife(5);
            this.virus = new Virus();
            this.virus.spawnVirus(25);
            this.char1 = new Character(37,39,38,40, new Vector(500,500), 1);
            this.char2 = new Character(65,68,87,83, new Vector(800,800), 2);
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
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
}