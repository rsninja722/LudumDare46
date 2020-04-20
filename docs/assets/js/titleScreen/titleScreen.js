var titleScreenState = "main"
var cursor = mousePos;
var timer = 0;

function handleTitleScreen() {

    switch (titleScreenState) {

        case ("main"):
            handleMainScreen();
            break;
        case ("credits"):
            handleCredits();
            break;



    }

    centerCameraOn(0,0)
    
    
}


function handleMainScreen(){
    if(rectpoint({x:415, y:200, w: 300, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
        globalState = globalStates.levelTransition;

        // Play the bgm
        soundAssets.backingtrack.playForever();
    }

    if(timer > 20){
        if(rectpoint({x:415, y:550, w: 300, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
            titleScreenState = "credits"
            
        }
    }else{
        timer++;
    }
}


function handleCredits(){
    
    
    
    if(timer > 20){
        if(rectpoint({x:705, y:550, w: 140, h: 50}, {x:cursor.x, y:cursor.y}) && mousePress[0]){
            titleScreenState = "main";
            timer = 0;
        }

        // Rsninja
        if(rectpoint({x:400, y:145, w: 340, h: 30}, {x:cursor.x, y:cursor.y}) && mousePress[0]){
            window.open('https://rsninja.dev/', '_blank');
            timer = 0;
        }

        // Silas
        if(rectpoint({x:420, y:227, w: 350, h: 31}, {x:cursor.x, y:cursor.y}) && mousePress[0]){
            window.open('https://exvacuum.dev', '_blank');
            timer = 0;
        }

        //Evan
        if(rectpoint({x:430, y:307, w: 360, h: 50}, {x:cursor.x, y:cursor.y}) && mousePress[0]){
            window.open('https://retrylife.ca/', '_blank');
            timer = 0;
        }

        // William
        if(rectpoint({x:460, y:382, w: 420, h: 50}, {x:cursor.x, y:cursor.y}) && mousePress[0]){
            window.open('https://wm-c.dev', '_blank');
            timer = 0;
        }
        
        // MarshMellow
        if(rectpoint({x:460, y:462, w: 420, h: 50}, {x:cursor.x, y:cursor.y}) && mousePress[0]){
            window.open('https://www.youtube.com/channel/UC5TeGG-Ak6ouX5JdxZB-ESg', '_blank');
            timer = 0;
        }
    }else{
        timer++;
    }
  
        

}



function drawTitleScreen() {

    if (titleScreenState === "main") {
        text("GAME TITLE HERE", 50, 50, "green", 8, 1000);
        rect(415, 200, 300, 50, "green");
        text("Play!", 355, 185, "white", 5, 150);

        rect(415, 550, 300, 50, "green");
        text("Credits", 325, 535, "white", 5, 150);
    }

    if (titleScreenState === "credits") {
        text("CREDITS", 250, 50, "green", 8, 300);

        text("rsninja dev", 250, 130, "green", 5, 1000);

        text("Silas Bartha", 250, 210, "green", 5, 1000);

        text("Evan Pratten", 250, 290, "green", 5, 1000);

        text("William Meathrel", 250, 370, "green", 5, 1000);

        text("MarshMellow", 250, 450, "green", 5, 1000);

        text("Sally Lopez", 250, 530, "green", 5, 1000)

        rect(705, 550, 140, 50, "green");
        text("Back", 650, 535, "white", 5, 150);

        text("*Names are links to their pages", 20, 495, "green", 2, 100);

    }







}