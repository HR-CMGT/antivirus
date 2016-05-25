class WhiteBloodCell {
    
    private div:HTMLElement;
    
    private downkey : number;
    private upkey : number;
    private leftkey : number;
    private rightkey : number;
    
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private downSpeed : number = 0;
    private upSpeed : number = 0;
    
    // om te zien of objecten elkaar raken moeten ze een public x,y,width,height hebben
    public x : number;
    public y : number;
    public targetX : number;
    public targetY : number;
    public width: number;
    public height: number;
    
    public getBounds():Rectangle{
        return new Rectangle(this.x,this.y,this.width, this.height);
    };
    
    constructor(left:number, right:number, up:number, down:number) {
        // maak een divje waar de gif in komt te staan
        this.div = document.createElement("whiteBloodCell");
        document.body.appendChild(this.div);
        
        // keys kunnen verschillend zijn voor elke instance van charmeleon
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        
        // positie
        this.x = Math.floor(200 + Math.random()*200);
        this.y = Math.floor(200 + Math.random()*200);
        this.width = 200;
        this.height = 200;
        
        console.log(this.x);
        console.log(this.y);
        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        
        console.log("De hoogte is " + window.innerHeight);
        console.log("De breedte is " + window.innerWidth);
    }
    
    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event:KeyboardEvent):void {
        
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 15;
            break;
        case this.downkey:
            this.downSpeed = 15;
            break;
        case this.leftkey:
            this.leftSpeed = 15;
            this.div.style.backgroundImage = "url('../images/player/player-look-right.png')";
            break;
        case this.rightkey:
            this.rightSpeed = 15;
            this.div.style.backgroundImage = "url('../images/player/player-look-left.png')";
            break;
        }
        
    }
        
    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 0;
            break;
        case this.downkey:
            this.downSpeed = 0;
            break;
        case this.leftkey:
            this.leftSpeed = 0;
            break;
        case this.rightkey:
            this.rightSpeed = 0;
            break;
        }
    }


    // bewegen - let op, de move functie wordt door game aangeroepen - animatie is niet smooth als de keydown listener een beweging triggered
    public move(): void {
        this.x = this.x + this.rightSpeed - this.leftSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;
        // de div positie aanpassen met transform - tip: scaleX kan je gebruiken om de andere kant op te kijken
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        //this.div.style.transform = "translate(100px, 100px)";

        //clamp van x en y op breedte en hoogte van het scherm
        this.x = this.clamp(this.x, 0, window.innerWidth - this.width);
        this.y = this.clamp(this.y, 0, window.innerHeight - this.height);
    }

    private clamp(val:number, min:number, max:number) : number{
        return Math.max(min, Math.min(max, val))
    }
}