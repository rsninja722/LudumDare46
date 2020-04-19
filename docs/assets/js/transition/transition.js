
var currentAlpha = 1.01;


function handleTransition(){

    // Calculates alpha until its zero
    if(currentAlpha > 0){
        currentAlpha -= .005;
    }


    centerCameraOn(constants.player.defaultX, constants.player.defaultY);

    if(camera.x > 898) {
        camera.x = 898;
    }
    if(camera.x < -98) {
        camera.x = -98;
    }
    if(camera.y < 245) {
        camera.y = 245;
    }
    if(camera.y > 350) {
        camera.y = 350;
    }
}


// UI for level transition
function drawLevelTransitionUI() { 

    // centers camera on player
    

    // sets alpha for background drawing
    canvases.ctx.globalAlpha = 1;

    // draws background sprites
    drawWorldBlocks();
    imgIgnoreCutoff(sprites.epic,0,0);
    player.draw();

    // sets alpha to calculated alpha for black
    canvases.ctx.globalAlpha = currentAlpha;

    // draw a black rect unless less the 0 alpha then switches to actual game
    if(currentAlpha > 0){
        rect(0, 0, 2000, 2000, "black");
    }else{
        globalState = globalStates.playing;
    }

    // resets alpha for rest of drawing
    canvases.ctx.globalAlpha = 1;
    
}
