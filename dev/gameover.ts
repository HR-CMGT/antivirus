/**
 * GameOver
 */
class GameOver {
    private scoreDiv:HTMLElement;
    private tryAgainDiv: HTMLElement;
    private scoreContainerDiv: HTMLElement;
    private totalContainerDiv: HTMLElement;
    private totalDiv: HTMLElement;
    private finalScore: number;
    private feedbackDiv:HTMLElement;
    private buttonYes:HTMLElement;
    private buttonNo:HTMLElement;
    public playerCount: number;
    public utils:Utils;
    private game : Game
    private buttonListener: EventListener;

    private mode : string = "replay"
    private joystickStatus : string = "left"

    constructor(game, score, playerCount) {
        this.game = game

        var background = new Background(1,1,false);
        this.playerCount = playerCount;
        this.finalScore = score;
        document.getElementById("background").style.cursor = "auto";
        this.createFinalScore();
        
        this.buttonListener = () => this.handleButton()
        document.addEventListener("joystick0button0", this.buttonListener)
        document.addEventListener("joystick1button0", this.buttonListener)
    }

    private handleButton() {
        document.removeEventListener("joystick0button0", this.buttonListener)
        document.removeEventListener("joystick1button0", this.buttonListener)

        // if(this.mode == "replay") this.levelload1()
        // else this.goBack()
        this.goBack()
    }
    public levelload1(){
        

        if (this.playerCount == 1) {
             new Level1(this.game, 1);
        } else {
            new Level1(this.game, 2);
        }

    }

    public goBack(){
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen(this.game);
    }

    public createFinalScore(){
        this.feedbackDiv = document.createElement("span");
        this.feedbackDiv.setAttribute("id", "feedback");
        document.getElementById("background").appendChild(this.feedbackDiv);

        this.scoreContainerDiv = document.createElement("span");
        this.scoreContainerDiv.setAttribute("id", "score-container");
        document.getElementById("background").appendChild(this.scoreContainerDiv);
        
        this.scoreDiv = document.createElement("span");
        this.scoreDiv.setAttribute("id", "score");
        document.getElementById("score-container").appendChild(this.scoreDiv);
        
        this.totalContainerDiv = document.createElement("span");
        this.totalContainerDiv.setAttribute("id", "total-container");
        document.getElementById("score-container").appendChild(this.totalContainerDiv);

        this.totalDiv = document.createElement("span");
        this.totalDiv.setAttribute("id", "total");
        this.totalDiv.innerHTML = ""+this.finalScore;
        document.getElementById("total-container").appendChild(this.totalDiv);

        this.tryAgainDiv = document.createElement("span");
        this.tryAgainDiv.setAttribute("id", "tryAgain");
        this.tryAgainDiv.innerHTML = "Press FIRE to restart"
        document.getElementById("background").appendChild(this.tryAgainDiv);

        // this.buttonYes = document.createElement("span");
        // this.buttonYes.setAttribute("id","resetGame");
        // document.getElementById("background").appendChild(this.buttonYes);
        // this.buttonYes.addEventListener("click", this.levelload1);

        // this.buttonNo = document.createElement("span");
        // this.buttonNo.setAttribute("id","stopGame");
        // document.getElementById("background").appendChild(this.buttonNo);
        // this.buttonNo.addEventListener("click", this.goBack);

        let widthScore = document.getElementById("score").clientWidth;
        let widthTotal = document.getElementById("total").clientWidth;

        let scoreContainerWidth = widthScore + widthTotal;
        let windowWidth = window.innerWidth;

        let offsetLeft = (windowWidth - scoreContainerWidth) /2;

        let marginLeft = scoreContainerWidth / 2;
        marginLeft = offsetLeft;
        // this.score.style.width = "100px";
        this.scoreContainerDiv.style.width = ""+scoreContainerWidth+"px";
        this.scoreContainerDiv.style.marginLeft = ""+marginLeft+"px";
    }

}