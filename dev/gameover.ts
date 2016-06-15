/**
 * GameOver
 */
class GameOver {
    private scoreDiv:HTMLElement;
    private tryAgainDiv: HTMLElement;
    private finalScore: number;
    private feedbackDiv:HTMLElement;
    private buttonYes:HTMLElement;
    private buttonNo:HTMLElement;
    public utils:Utils;

    constructor(score) {
        var background = new Background(1,1);
        this.finalScore = score;
        document.getElementById("background").style.cursor = "auto";
        this.createFinalScore();
    }

    public levelload1(){
        new Level1(1);
    }

    public goBack(){
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen();
    }

    public createFinalScore(){
        this.feedbackDiv = document.createElement("h3");
        this.feedbackDiv.setAttribute("id", "feedback");
        document.getElementById("background").appendChild(this.feedbackDiv);
        this.feedbackDiv.innerHTML = "Goed gedaan!";
        
        this.scoreDiv = document.createElement("h1");
        this.scoreDiv.innerHTML = "Score: "+ this.finalScore;
        document.getElementById("background").appendChild(this.scoreDiv);
        
        this.tryAgainDiv = document.createElement("p");
        document.getElementById("background").appendChild(this.tryAgainDiv);
        this.tryAgainDiv.innerHTML = "Opnieuw proberen?";

        this.buttonYes = document.createElement("h2");
        this.buttonYes.setAttribute("id","resetGame");
        this.buttonYes.innerHTML = "Ja";
        document.getElementById("background").appendChild(this.buttonYes);
        this.buttonYes.addEventListener("click", this.levelload1);

        this.buttonNo = document.createElement("h2");
        this.buttonNo.setAttribute("id","stopGame");
        this.buttonNo.innerHTML = "Nee";
        document.getElementById("background").appendChild(this.buttonNo);
        this.buttonNo.addEventListener("click", this.goBack);

    }

}