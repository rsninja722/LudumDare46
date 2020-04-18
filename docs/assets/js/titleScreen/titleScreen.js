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
    
    
}


function handleMainScreen(){
    if(timer > 20){
        if(rectpoint({x:415, y:200, w: 300, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
            globalState = globalStates.playing;
            timer = 0;
        }
        if(rectpoint({x:415, y:550, w: 300, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
            titleScreenState = "credits"
            timer = 0;
        }
    }else{
        timer++;
    }
}


function handleCredits(){

    if(timer > 20){
        if(rectpoint({x:395, y:550, w: 140, h: 50}, {x:cursor.x, y:cursor.y}) && mouseDown[0]){
            titleScreenState = "main";
            timer = 0;
        }
    }else{
        timer++;
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



        rect(395, 550, 140, 50, "green");
        text("Back", 345, 535, "white", 5, 150);

    }





}