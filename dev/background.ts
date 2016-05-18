class Background {
    
    constructor(backLayerImage:number, frontLayerImage:number){
        
        var background1 = backLayer();
        var background2 = midLayer();
        var background3 = frontLayer();
        
        function backLayer(){
            var backLayer = document.createElement("backLayer");
            backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".png\")";
            backLayer.style.width = "100%";
            backLayer.style.height = "100%";
            backLayer.style.backgroundSize = "cover";
            document.body.appendChild(backLayer);
        }
        
        function midLayer(){
            for (var i = 26; i < 36; i++) {
            var randomImage = Math.floor(Math.random()*15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random()*window.innerHeight);
            var randomAnimationSpeed = i;
            var backgroundCellSmall = document.createElement('backgroundCellSmall');
            
            backgroundCellSmall.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + "small.png\")";
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
            
            backgroundCellMedium.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + "medium.png\")";
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
            
            backgroundCellLarge.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + "large.png\")";
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
        
        function frontLayer(){
            var frontLayer = document.createElement("frontLayer");
            frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
            frontLayer.style.width = "100%";
            frontLayer.style.height = "100%";
            frontLayer.style.backgroundSize = "cover";
            document.body.appendChild(frontLayer);   
        }
        
    }    
    
}