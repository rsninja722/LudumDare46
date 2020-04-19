var titleScreenState = "main"
var cursor = mousePos;
var timer = 0;

function handleTitleScreen(){
    
    switch(titleScreenState){
        
        case("main"):
            handleMainScreen();
            break;
        case("credits"):
            handleCredits();
            break;



    }

    centerCameraOn(0,0)
    
    
}


function handleMainScreen(){
    if(rectpoint({x:415, y:200, w: 300, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
        globalState = globalStates.levelTransition;
        timer = 0;
    }

    if(timer > 20){
        if(rectpoint({x:415, y:550, w: 300, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
            titleScreenState = "credits"
            timer = 0;
        }
    }else{
        timer++;
    }
}


function handleCredits(){
    //console.log(`X ${cursor.x}, Y ${cursor.y}`);
    if(timer > 20){
        if(rectpoint({x:395, y:550, w: 140, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
            titleScreenState = "main";
            timer = 0;
        }
    }else{
        timer++;
    }

    // Rsninja
    if(rectpoint({x:400, y:145, w: 340, h: 30}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
        window.open('https://rsninja.dev/', '_blank');
    }

    // Silas
    if(rectpoint({x:420, y:227, w: 350, h: 31}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
        window.open('https://exvacuum.dev', '_blank');
    }

    //Evan
    if(rectpoint({x:430, y:307, w: 360, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
        window.open('https://retrylife.ca/', '_blank');
    }

    // // William
    if(rectpoint({x:460, y:382, w: 420, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
        window.open('https://wm-c.dev', '_blank');
    }
        

}



function drawTitleScreen(){
    
    if(titleScreenState === "main"){
        text("GAME TITLE HERE", 50, 50, "green", 8, 1000);
        rect(415, 200, 300, 50, "green");
        text("Play!", 355, 185, "white", 5, 150);

        rect(415, 550, 300, 50, "green");
        text("Credits", 325, 535, "white", 5, 150);
    }

    if(titleScreenState === "credits"){
        text("CREDITS", 250, 50, "green", 8, 300);

        text("rsninja dev", 250, 130, "green", 5, 1000);

        text("Silas Bartha", 250, 210, "green", 5, 1000);

        text("Evan Pratten", 250, 290, "green", 5, 1000);

        text("William Meathrel", 250, 370, "green", 5, 1000)

        //text("Sally Lopez", 250, 320, "green", 5, 1000)

        rect(395, 550, 140, 50, "green");
        text("Back", 345, 535, "white", 5, 150);

    }







}