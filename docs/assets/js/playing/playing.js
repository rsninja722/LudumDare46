var tutorialStates = {
    selectLeg:0,
    placeOnGround:1,
    goDownStairs:2,
    getCereal: 3,
    getMail: 4,
    goToBed: 5
};

var tutState = tutorialStates.selectLeg;

// how many times 
var keyPrompts = {
    beat: 2,
    breath: 2,
    blink: 1
};

var keyPromptTime;

var frameCount = 0;

var boxOnTable = false;

function handlePlaying() {
    // enter build mode
    if(keyPress[k.BACKSLASH]) {
        globalState = globalStates.building;
    }

    switch(tutState) {
        case tutorialStates.selectLeg:
            if(player.shouldMoveLeg) {
                tutState = tutorialStates.placeOnGround;
            }
            break;
        case tutorialStates.placeOnGround:
            if(!player.shouldMoveLeg) {
                tutState = tutorialStates.goDownStairs;
            }
            break;
        case tutorialStates.goDownStairs:
            if(player.y > -55) {
                tutState = tutorialStates.getCereal;
                keyPromptTime = Date.now();
            }
            break;
        case tutorialStates.getCereal:
            break;
        case tutorialStates.getMail:
            if(boxOnTable) {
                tutState = tutorialStates.goToBed;
            }
            break;
        case tutorialStates.goToBed:
            if(player.x > 560) {
                globalState = globalStates.end;
            }
            break;
    }

    // rise heart ui
    if(player.y > -55) {
        if(playingUIOffsets.heart > 0) {
            --playingUIOffsets.heart;
        }
    }

    // rise breath ui
    if(player.y > 135) {
        if(playingUIOffsets.breath > 0) {
            --playingUIOffsets.breath;
        }
    }

    // rise blink ui
    if(player.x < -290) {
        if(playingUIOffsets.blink > 0) {
            --playingUIOffsets.blink;
        }
    }

    updateLife();
    updateParticles();
    updateObjectives();
}

function drawPlaying() {
    frameCount++;
    if(!justBlinked) {

        imgIgnoreCutoff(sprites.epic,0,0);
        imgIgnoreCutoff(sprites.post,-740,156,0,4,4);
        imgIgnoreCutoff(sprites.chandelier,770,-235,0,4,4);

        if(boxOnTable) {
            imgIgnoreCutoff(sprites.boxNoOutline,-140,116,0,4,4);
        }

        drawParticles();

        // drawWorldBlocks();
        player.draw();

        // beat key
        if(keyPrompts.beat > 0 && playingUIOffsets.heart === 0) {
            if(Date.now() - keyPromptTime > 1250) {
                img(sprites.tutKeyC,player.x + 70, player.y + (~~(frameCount/10)%2) * 2,0,2,2);
            }
        }

        // breath key
        if(keyPrompts.breath > 0 && playingUIOffsets.breath === 0) {
            if(Date.now() - keyPromptTime > 3000) {
                img(sprites.tutKeyX,player.x + 70, player.y + (~~(frameCount/10)%2) * 2,0,2,2);
            }
        }

        // blink key
        if(keyPrompts.blink > 0 && playingUIOffsets.blink === 0) {
            if(Date.now() - keyPromptTime > 4000) {
                img(sprites.tutKeyZ,player.x + 70, player.y + (~~(frameCount/10)%2) * 2,0,2,2);
            }
        }
        switch(tutState) {
            case tutorialStates.selectLeg:
                img(sprites["tutSelect"+~~(frameCount/10)%2],(player.leftLeg.x+player.leftLeg.x2)/2,(player.leftLeg.y+player.leftLeg.y2)/2,0,2,2);
                break;
            case tutorialStates.placeOnGround:
                img(sprites["tutSelect"+~~(frameCount/10)%2],500,-40,2,2);
                break;
            case tutorialStates.goDownStairs:
                img(sprites.tutArrow,360+~~(frameCount/10)%2,-30-~~(frameCount/10)%2,0,2,2);
                break;
            case tutorialStates.getCereal:
    
                break;
            case tutorialStates.getMail:
    
                break;
        }

        drawObjectives();
    } else {
        rect(-camera.x - difx + cw/2,-camera.y - dify + ch/2,cw,ch,"black");
        justBlinked = false;
    }
    
}