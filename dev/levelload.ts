class Levelload {
    
    constructor(){
        this.levelloaded();
        this.spacebarPress();
        
    }
    
    levelloaded(){
        console.log("level loaded");
    }
    
    spacebarPress(e){
        if(e.keyCode == 32){
            console.log("spacebar pressed");
            new Level1;
        }
    }
    
}