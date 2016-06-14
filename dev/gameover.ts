/**
 * GameOver
 */
class GameOver {
    private scoreDiv:HTMLElement;
    private tryAgainDiv: HTMLElement;
    private finalScore: number;
    private popUp:HTMLElement;
    private buttonYes:HTMLElement;
    private buttonNo:HTMLElement;

    constructor(score) {
        var background = new Background(1,1);
        this.finalScore = score;
        document.getElementById("background").style.cursor = "auto";
        this.createFinalScore();
    }

    public levelload1(){
        new Level1(1);
    }

    public titleScreeen(){
        new Titlescreen();
    }

    public createFinalScore(){
        this.popUp = document.createElement("popUp");
        this.popUp.setAttribute("id", "popUp");
        document.getElementById("background").appendChild(this.popUp);
        
        this.scoreDiv = document.createElement("h1");
        this.scoreDiv.innerHTML = "Score: "+ this.finalScore;
        document.getElementById("popUp").appendChild(this.scoreDiv);
        
        this.tryAgainDiv = document.createElement("p");
        document.getElementById("popUp").appendChild(this.tryAgainDiv);
        this.tryAgainDiv.innerHTML = "Opnieuw proberen?";

        this.buttonYes = document.createElement("h2");
        this.buttonYes.setAttribute("id","resetGame");
        this.buttonYes.innerHTML = "Ja";
        document.getElementById("popUp").appendChild(this.buttonYes);
        this.buttonYes.addEventListener("click", this.levelload1);

        this.buttonNo = document.createElement("h2");
        this.buttonNo.setAttribute("id","stopGame");
        this.buttonNo.innerHTML = "Nee";
        document.getElementById("popUp").appendChild(this.buttonNo);
        this.buttonNo.addEventListener("click", this.titleScreeen);

    }

}