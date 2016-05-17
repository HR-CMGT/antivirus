class titleChaseFar {
     constructor(){
         var titleChaseFar = document.createElement('titleChaseFar');
         
         titleChaseFar.style.backgroundImage = "url(\"../images/titlescreen/titleChaseFar.png\")";
         titleChaseFar.style.height = "100px";
         titleChaseFar.style.width = "200px";
         titleChaseFar.style.left = "-200px";
         titleChaseFar.style.top = "30%";
         titleChaseFar.style.position = "absolute";
         titleChaseFar.style.animation = "titleChaseFarMove 15s infinite";
         titleChaseFar.style.animationTimingFunction = "linear";
         document.body.appendChild(titleChaseFar);
     }
}