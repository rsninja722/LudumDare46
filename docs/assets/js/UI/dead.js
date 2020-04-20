function deadUI() {
    rect(cw/2,ch/2,cw,ch,"black");
    text("Mike Died", 300, 50, "#992929", 4);
    text("maybe try to keep your heart beating, also it doesn't hurt to breath occasionally ", 250, 100, "white", 2, 400);

    img(sprites["buttonBig" + (rectpoint({ x: 400, y: 550, w: 300, h: 50 }, mousePos) ? "Hover" : "")], 400, 550, 0, 2, 2);
    text("time travel back", 260, 540, "#403826", 3);
}

function handleDead() {

    if(rectpoint({ x: 400, y: 550, w: 300, h: 50 }, mousePos) && mousePress[0]) {
        soundAssets.click.play();
        player = new Player(constants.player.defaultX, constants.player.defaultY);

        // why does this stop the legs from glitching on the first step???
        player.rightLeg.angle = -pointTo({ x: player.rightLeg.x2, y: player.rightLeg.y2 }, player.hipRight);
        player.leftLeg.angle = pointTo({ x: player.leftLeg.x2, y: player.leftLeg.y2 }, player.hipLeft);
        player.moveLeg();

        Objectives = [];
        Objectives.push(new Objective(-140,108,60,300,"cereal",function(){console.log("%c cereal obtained 😎","font-size:200%;");tutState = tutorialStates.getMail;}));
        Objectives.push(new Objective(-740,156,50,50,"box",function(){console.log("%c the entire mailbox obtained 😎","font-size:200%;");player.holdingBox = true;}));
        
        playingUIOffsets = {
            heart: 100,
            breath: 100,
            blink: 100
        };

        tutState = tutorialStates.selectLeg;

        breath = 200;
        pressure = 55;
        fullBreathTimer = 0;
        noBreathTimer = 0;
        heartBeat = false;
        currentBreathMode = breathMode.inhale;
        eyeDryness = 0;

        globalState = globalStates.levelTransition;
    }
}