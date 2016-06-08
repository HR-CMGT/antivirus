class Level1 {
    
    
    private char1:Player;
    private char2:Player;
    public playerCount;
    private utils:Utils;
    public lifes: Array<Life> = new Array<Life>();
    public viruses: Array<Virus> = new Array<Virus>();
    public timer: number;
    public virusCount: number = 0;
    public scoreCount: number = 0;
    private score: HTMLElement;
    public spawnTime: number;
    public enemy:Enemy;
    
    constructor(playerCount:number){
        
        this.enemy = new Enemy(new Vector(0,0));
        this.playerCount = playerCount;
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        
        var background = new Background(1,1);
        
        this.score = document.createElement("score");
        this.score.innerHTML = ""+this.scoreCount;
        this.score.style.marginLeft = "50%";
        this.score.style.width = "100px";
        this.score.style.height = "50px";
        this.score.style.fontSize = "70px";
        this.score.style.color = "white";
        document.body.appendChild(this.score);
        
        this.spawnTime = 2000;
        

        if(playerCount == 1){
            
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }
            

            this.spawnTimer(this.spawnVirus, this.spawnTime);
            
            // setInterval(function(){ this.viruses.push(new Virus()); },500);           
            // for (var i = 0; i < 10; i++) {
            //     this.viruses.push(new Virus());
            // }
            
            this.char1 = new Character(37,39,38,40, new Vector(500,500), 1);

            
        } else {

            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }
        
            this.timer = setInterval(this.spawnVirus.bind(this), 750);
            
            this.char1 = new Character(37,39,38,40, new Vector(1500,1500), 1);
            this.char2 = new Character(65,68,87,83, new Vector(1500,1500), 2);                        
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    private spawnVirus(){
        this.viruses.push(new Virus(this.virusCount, this.enemy.randomPosition()));
        this.virusCount++;
        if(this.spawnTime > 200){  
            this.spawnTime = this.spawnTime -10;
        }
        console.log("dit is de spawntime "+this.spawnTime);
        console.log(this.virusCount);
        clearInterval(this.timer);
        this.spawnTimer(this.spawnVirus, this.spawnTime);
    }
    
    private spawnTimer(spawnVirus, time:number){
        this.timer = setInterval(this.spawnVirus.bind(this), this.spawnTime);
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
            life.move();
        }
        
        for (let i = 0; i < this.viruses.length; i++) {
            let random = Math.floor(Math.random() * this.lifes.length);
            if (this.lifes.length == 0) {
                this.viruses.splice(0, this.viruses.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new Titlescreen();
            } else {
                this.viruses[i].move(this.lifes[random]);
                if (this.viruses[i].hitsLife(this.lifes[random]) == true) {
                    var life = document.getElementById("" + this.lifes[random].id);
                    life.remove();
                    this.lifes.splice(random, 1);
                }
            }
            
            if (this.viruses[i].hitbox.hitsOtherRectangle(this.char1.rectangle)){
                console.log("hitbox detected");
                this.viruses[i].changeImage("url(\"../images/characters/virus2.png\")");
            } else {
                this.viruses[i].changeImage("url(\"../images/characters/virus1.png\")");
            }

            if(this.playerCount == 1){
                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle)){
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = ""+this.scoreCount;  
                }
            } else {

            if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle) || this.viruses[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                // var enemy  = document.getElementById("virus"+virus.id);
                this.viruses[i].remove();
                this.viruses.splice(i, 1);
                this.scoreCount++;
                this.score.innerHTML = ""+this.scoreCount;
                }
            }

        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
}