//Start the game
class Game {
    private arcade : Arcade
    private joystickListener : EventListener
    titleScreen: Titlescreen;

    public get Arcade() : Arcade { return this.arcade }

    constructor(){
        this.arcade = new Arcade(true)
        this.titleScreen = new Titlescreen(this);
        this.update()
     }

     private update() {
        this.titleScreen.update()
        requestAnimationFrame(() => this.update())
    }

}