class titleChaseClose {
     constructor(){
         var positionX = window.innerWidth;
         var titleChaseClose = document.createElement('titleChaseClose');
         
         titleChaseClose.style.backgroundImage = "url(\"../images/titlescreen/titleChaseClose.png\")";
         titleChaseClose.style.height = "200px";
         titleChaseClose.style.width = "400px";
         titleChaseClose.style.left = positionX + "px";
         titleChaseClose.style.top = "60%";
         titleChaseClose.style.position = "absolute";
         titleChaseClose.style.animation = "titleChaseCloseMove 15s infinite";
         titleChaseClose.style.animationTimingFunction = "linear";
         document.body.appendChild(titleChaseClose);
     }
}