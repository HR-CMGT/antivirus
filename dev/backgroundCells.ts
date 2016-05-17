class backgroundCells {
    
    constructor(){
        
        for (var i = 26; i < 36; i++) {
            var randomImage = Math.floor(Math.random()*15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random()*window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellSmall = document.createElement('backgroundCellSmall');
            
            backgroundCellSmall.style.backgroundImage = "url(\"../images/backgrounds/cell"+randomImage+"small.png\")";
            backgroundCellSmall.style.height = "25px";
            backgroundCellSmall.style.width = "25px";
            backgroundCellSmall.style.left = positionX + "px";
            backgroundCellSmall.style.top = randomPositionY + "px";
            backgroundCellSmall.style.position = "absolute";
            backgroundCellSmall.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s infinite";
            backgroundCellSmall.style.animationTimingFunction = "linear";
            document.body.appendChild(backgroundCellSmall);       
        }
        
        for (var i = 16; i < 26; i++) {
            var randomImage = Math.floor(Math.random()*15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random()*window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellMedium = document.createElement('backgroundCellMedium');
            
            backgroundCellMedium.style.backgroundImage = "url(\"../images/backgrounds/cell"+randomImage+"medium.png\")";
            backgroundCellMedium.style.height = "50px";
            backgroundCellMedium.style.width = "50px";
            backgroundCellMedium.style.left = positionX + "px";
            backgroundCellMedium.style.top = randomPositionY + "px";
            backgroundCellMedium.style.position = "absolute";
            backgroundCellMedium.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s infinite";
            backgroundCellMedium.style.animationTimingFunction = "linear";
            document.body.appendChild(backgroundCellMedium);       
        }
        
        for (var i = 6; i < 16; i++) {
            var randomImage = Math.floor(Math.random()*15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random()*window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellLarge = document.createElement('backgroundCellLarge');
            
            backgroundCellLarge.style.backgroundImage = "url(\"../images/backgrounds/cell"+randomImage+"large.png\")";
            backgroundCellLarge.style.height = "75px";
            backgroundCellLarge.style.width = "75px";
            backgroundCellLarge.style.left = positionX + "px";
            backgroundCellLarge.style.top = randomPositionY + "px";
            backgroundCellLarge.style.position = "absolute";
            backgroundCellLarge.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s infinite";
            backgroundCellLarge.style.animationTimingFunction = "linear";
            document.body.appendChild(backgroundCellLarge);       
        }
        
        
    }
}