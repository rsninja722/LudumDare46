// UI for title screen
function drawTitleScreenUI() {
}


var playingUIOffsets = {
    heart: 100,
    breath: 100,
    blink: 100
};

// UI for playing
function drawPlayingUI() {

    // cartesianRect(0,ch/3*2, cw, ch/3, "#333333")

    //Heart Rate Monitor
    heartBeatUI(cw / 4 * 3 - 8, ch / 8 * 7 - 8 + playingUIOffsets.heart, cw / 4, ch / 8);

    //Respiration Monitor
    respiratoryUI(cw / 8 * 5, ch / 8 * 7 - 8 + playingUIOffsets.breath, cw / 16, ch / 8);

    //Blink eye and overlay
    blinkUI();
}

//UI for pause screen
function drawPausedUI() {
}

//UI for game end
function drawEndUI() {
}


/***
 *
 * RESPIRATORY UI
 *
 */

function respiratoryUI(x, y, width, height) {
    // cartesianRect(x, y, width, height, "rgb(" + noBreathTimer / 180 * 255 + "," + 0 + "," + 0 + ")");
    // cartesianRect(x, y + (height - breath / constants.lifeFuncs.breath.fullBreath * height), width, breath / constants.lifeFuncs.breath.fullBreath * height, "rgb(" + 255 + "," + (255 - fullBreathTimer / 180 * 255) + "," + (255 - fullBreathTimer / 180 * 255) + ")");

    var color = currentBreathMode === breathMode.inhale ? "rgb(" + fullBreathTimer + ",0,0)" : "rgb(" + noBreathTimer + ",0,0)";
    rect(cw - 275, ch - 46 + playingUIOffsets.breath,70,70,color);

    img(sprites.lungBack,cw - 275, ch - 46 + playingUIOffsets.breath);

    img(sprites.lungCover,cw - 275, ch - 46 + playingUIOffsets.breath);

    img(sprites.lungs,cw - 275, ch - 46 + playingUIOffsets.breath, 0, 1.5 + breath / 400, 1.5 + breath / 300 );
}

/***
 *
 * HEART RATE MONITOR UI
 *
 */

//Heart rate monitor history 
let heartBeatHistory = [];
heartBeatHistory.length = constants.ui.heartRate.history_length;
heartBeatHistory.fill(0);

//Shift accumulation
let shiftAccum = 0;

//Beat progression
let beatTimeElapsed = Infinity;

// Draw heartbeat UI
function heartBeatUI(x, y, width, height) {

    //Shift monitor over once a full scrolling unit is accumulated
    shiftAccum += constants.ui.heartRate.scroll_speed;
    if (shiftAccum >= 1) {
        shiftAccum %= 1;
        beatTimeElapsed += 0.04;

        //Remove oldest value
        heartBeatHistory.shift();

        //Append new value
        pushNextBeatValue();
    }

    //If heart is beaten, reset beat timer.
    if (heartBeat) {
        beatTimeElapsed = 0;
        heartBeat = false;
    }

    //Backdrop
    var BackdropColor;
    if (pressure > 42 && pressure < 60) {
        BackdropColor = "#0c2605";
    } else if (pressure > 28 && pressure < 75) {
        BackdropColor = "#2b2b06";
    } else {
        BackdropColor = "#260505";
    }
    rect(x + width / 2, y + height / 2, width, height, BackdropColor);
    img(sprites.heartBack, cw - 107, ch - 46 + playingUIOffsets.heart);

    //Pressure Meter
    rect(x + width - 8, y + height / 2, 16, height, "red");
    rect(x + width - 8, y + height / 2, 16, height / 2, "yellow");
    rect(x + width - 8, y + height / 2, 16, height / 6, "green");
    let pressureHeight = Math.max(Math.min(y + height - (pressure / constants.lifeFuncs.cardio.optimalPressure * height / 2), y + height), y);
    line(x + width - 16, pressureHeight, x + width, pressureHeight, 2, "black")

    //Graph
    for (let index = 0; index < heartBeatHistory.length; index++) {
        const qrsValueAtPosition = heartBeatHistory[index];
        const qrsValueAtNextPosition = heartBeatHistory[index + 1];
        line(x + (index * (width - 16) / heartBeatHistory.length), y + (2 * height / 3) + (qrsValueAtPosition * (width - 16) / heartBeatHistory.length), x + ((index + 1) * (width - 16) / heartBeatHistory.length), y + (2 * height / 3) + (qrsValueAtNextPosition * (width - 16) / heartBeatHistory.length), Math.min(3, Math.max(3 / beatTimeElapsed, 1)), "red");
    }

    // cover
    img(sprites.heartCover, cw - 107, ch - 46 + playingUIOffsets.heart);
}

//Determine next value to be added to the graph
function pushNextBeatValue() {
    let nextBeatValue = 0;

    //Timespan of one "square" on the EKG
    const squareSize = constants.ui.heartRate.square_size;
    //Length of full complex
    const complexTime = constants.ui.heartRate.complex_width * squareSize;
    //Length of PR segment of complex
    const prTime = constants.ui.heartRate.pr_width * squareSize;
    //Length of QRS component of complex
    const qrsTime = constants.ui.heartRate.qrs_width * squareSize;
    //Length of QT component of complex
    const qtTime = constants.ui.heartRate.qt_width * squareSize;

    if (beatTimeElapsed <= complexTime) {
        //PR Segment
        if (beatTimeElapsed <= prTime) {
            nextBeatValue = 0.5 * (Math.pow((beatTimeElapsed / squareSize - (prTime / 2 / squareSize)), 2)) - 2;
        } else if (beatTimeElapsed > prTime + squareSize && beatTimeElapsed <= prTime + squareSize + (qrsTime / 4)) { //QRS Segment pt. 1
            nextBeatValue = -4 + beatTimeElapsed / squareSize;
        } else if (beatTimeElapsed > prTime + squareSize + qrsTime / 4 && beatTimeElapsed <= prTime + squareSize + qrsTime / 2) { //QRS Segment pt. 2
            nextBeatValue = -14 * (beatTimeElapsed / squareSize - 4.5) - 0.5;
        } else if (beatTimeElapsed > prTime + squareSize + qrsTime / 2 && beatTimeElapsed <= prTime + squareSize + (3 * qrsTime / 4)) { //QRS Segment pt. 3
            nextBeatValue = 7 * (beatTimeElapsed / squareSize - 5) - 6.5;
        } else if (beatTimeElapsed > prTime + squareSize + (3 * qrsTime / 4) && beatTimeElapsed <= prTime + squareSize + qrsTime) { //QRS Segment pt. 4
            nextBeatValue = 2 * (beatTimeElapsed / squareSize - 6);
        } else if (beatTimeElapsed > prTime + squareSize * 2 + qrsTime && beatTimeElapsed <= prTime + squareSize * 2 + qrsTime + qtTime) { //PT Segment
            nextBeatValue = 0.5 * Math.pow((beatTimeElapsed / squareSize - (prTime + squareSize * 2 + qrsTime + qtTime / 2) / squareSize), 2) - 3;
        }
    }

    heartBeatHistory.push(nextBeatValue);
}


function blinkUI() {
    // eye
    img(sprites.eye, cw - 350, ch - 40 + playingUIOffsets.blink, 0, 2, 2);
    var alpha = clamp(eyeDryness / constants.lifeFuncs.blink.dryTime, 0, 1);
    curCtx.globalAlpha = alpha;
    img(sprites.eyeDry, cw - 350, ch - 40 + playingUIOffsets.blink, 0, 2, 2);

    // dry overlay
    if (eyeDryness > constants.lifeFuncs.blink.dryTime) {
        alpha = (eyeDryness - constants.lifeFuncs.blink.dryTime) / 350;
        curCtx.globalAlpha = alpha;
        img(sprites.blinkOverlay, cw / 2, ch / 2);
    }

    curCtx.globalAlpha = 1;
}