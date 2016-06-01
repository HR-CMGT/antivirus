class WhiteBloodCell extends GameObject {

    private div: HTMLElement;

    private downkey: number;
    private upkey: number;
    private leftkey: number;
    private rightkey: number;

    private leftSpeed : Vector;
    private rightSpeed : Vector;
    private downSpeed : Vector;
    private upSpeed : Vector;

    // om te zien of objecten elkaar raken moeten ze een public x,y,width,height hebben
    public x: number;
    public y: number;
    public targetX: number;
    public targetY: number;
    public width: number;
    public height: number;
    
    public getBounds():Rectangle{
        return new Rectangle(this.position,this.width, this.height);
    };

    constructor(left: number, right: number, up: number, down: number, pos: Vector) {
        super(pos);
        // maak een divje waar de gif in komt te staan
        this.div = document.createElement("whiteBloodCell");
        document.body.appendChild(this.div);

        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.speed = new Vector(0, 0);
        
        this.rightSpeed = new Vector(0,0);
        this.leftSpeed = new Vector(0,0);
        this.upSpeed = new Vector(0,0);
        this.downSpeed = new Vector(0,0);

        // positie
        this.width = 200;
        this.height = 200;

        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, -15);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 15);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(-15, 0);
                this.div.style.backgroundImage = "url('../images/player/player-look-left.png')";
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(15, 0);
                this.div.style.backgroundImage = "url('../images/player/player-look-right.png')";
                break;
        }

    }

    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0,0);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0,0);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(0,0);
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(0,0);
                break;
        }
    }


    // bewegen - let op, de move functie wordt door game aangeroepen - animatie is niet smooth als de keydown listener een beweging triggered
    public move(): void {

        this.position = this.position.add(this.leftSpeed.add(this.rightSpeed));
        ;
        this.position = this.position.add(this.upSpeed.add(this.downSpeed));

        // de div positie aanpassen met transform - tip: scaleX kan je gebruiken om de andere kant op te kijken
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";

        //clamp van x en y op breedte en hoogte van het scherm
        this.position.x = this.clamp(this.position.x, 0, window.innerWidth - this.width);
        this.position.y = this.clamp(this.position.y, 0, window.innerHeight - this.height);
    }

    private clamp(val: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, val))
    }
}