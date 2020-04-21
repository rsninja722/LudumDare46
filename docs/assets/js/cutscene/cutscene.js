var lightY = -300;
var vel = 1;

function drawCutScene() {
    if (cutTime < 135) {
        imgIgnoreCutoff(sprites.slep, 0, 0);
        imgIgnoreCutoff(sprites.chandelier, 770, lightY, 0, 4, 4);
    } else {
        camera.x = 0;
        camera.y = 0;
        difx = 0;
        dify = 0;
        rect(cw / 2, ch / 2, cw, ch, "black");
        text("Mike Died", 300, 50, "#992929", 4);
        text("Thanks for playing!", 200, 100, "#992929", 4);
    }
}

var cutTime = 0;
function updateCutScene() {
    cutTime++;
    if (cutTime < 135) {
        if (cutTime > 50 && cutTime < 58) {
            lightY += 2;
        }

        if (cutTime > 100) {
            lightY += vel;
            vel += 0.1;
        }
    }
    if(cutTime===52) {
        soundAssets.crack.play();
    }
    if(cutTime===140) {
        soundAssets.crash.play();
    }
    if (cutTime >= 500) {
        globalState = globalStates.titleScreen;
        titleScreenState = "credits";
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
    }
}