//Colors

// UI for title screen
function drawTitleScreenUI() {
}

// UI for level transition
function drawLevelTransitionUI() {
}

// UI for playing
function drawPlayingUI() {
    heartBeatUI(cw/4*3-8,ch/8*7-8,cw/4,ch/8);
}

//UI for pause screen
function drawPausedUI() {
}

//UI for game end
function drawEndUI() {
}

// Construct a rectangular UI
function rectUI() {};

//Heart rate monitor history 
let heartBeatHistory = []
    heartBeatHistory.length = constants.ui.heartRate.history_length;
    heartBeatHistory.fill(0);

//Shift accumulation
let shiftAccum = 0;

//Beat progression
let beatTimeElapsed = 0;

// Draw heartbeat UI
function heartBeatUI(x, y, width, height){

    //Shift monitor over once a full scrolling unit is accumulated
    shiftAccum += constants.ui.heartRate.scroll_speed;
    if(shiftAccum>=1){
        shiftAccum%=1;
        beatTimeElapsed += 0.04;

        //Remove oldest value
        heartBeatHistory.shift();

        //Append new value
        pushNextBeatValue();
    }

    //If heart is beaten, reset beat timer.
    if(heartBeat){
        beatTimeElapsed = 0;
        heartBeat = false;
    }

    //Backdrop
    rect(x+width/2,y+height/2,width,height,"black");

    //Graph
    for (let index = 0; index < heartBeatHistory.length; index++) {
        const qrsValueAtPosition = heartBeatHistory[index];
        const qrsValueAtNextPosition = heartBeatHistory[index+1];
        line(x+(index*width/heartBeatHistory.length), y+(2*height/3)+(qrsValueAtPosition*width/heartBeatHistory.length), x+((index+1)*width/heartBeatHistory.length), y+(2*height/3)+(qrsValueAtNextPosition*width/heartBeatHistory.length), "red");
    }
}

//Determine next value to be added to the graph
function pushNextBeatValue(){
    let nextBeatValue = 0;

    //Timespan of one "square" on the EKG
    const squareSize = constants.ui.heartRate.square_size;
    //Length of full complex
    const complexTime = constants.ui.heartRate.complex_width*squareSize;
    //Length of PR segment of complex
    const prTime = constants.ui.heartRate.pr_width*squareSize;
    //Length of QRS component of complex
    const qrsTime = constants.ui.heartRate.qrs_width*squareSize;
    //Length of QT component of complex
    const qtTime = constants.ui.heartRate.qt_width*squareSize;

    if(beatTimeElapsed<=complexTime) {
        //PR Segment
        if (beatTimeElapsed <= prTime) {
            nextBeatValue = 0.5*(Math.pow((beatTimeElapsed/squareSize - (prTime/2/squareSize)), 2)) - 2;
        } else if (beatTimeElapsed > prTime + squareSize && beatTimeElapsed <= prTime + squareSize + (qrsTime / 4)) { //QRS Segment pt. 1
            nextBeatValue = -4 + beatTimeElapsed/squareSize;
        } else if (beatTimeElapsed > prTime + squareSize + qrsTime / 4 && beatTimeElapsed <= prTime + squareSize + qrsTime / 2) { //QRS Segment pt. 2
            nextBeatValue = -14 * (beatTimeElapsed/squareSize - 4.5) - 0.5;
        } else if (beatTimeElapsed > prTime + squareSize + qrsTime / 2 && beatTimeElapsed <= prTime + squareSize + (3*qrsTime / 4)) { //QRS Segment pt. 3
            nextBeatValue = 7 * (beatTimeElapsed/squareSize - 5) - 6.5;
        } else if (beatTimeElapsed > prTime + squareSize + (3*qrsTime / 4) && beatTimeElapsed <= prTime + squareSize + qrsTime) { //QRS Segment pt. 4
            nextBeatValue = 2 * (beatTimeElapsed/squareSize - 6);
        } else if (beatTimeElapsed > prTime + squareSize*2 + qrsTime && beatTimeElapsed <= prTime + squareSize*2 + qrsTime + qtTime) { //PT Segment
            nextBeatValue = 0.5 * Math.pow((beatTimeElapsed/squareSize - (prTime + squareSize*2 + qrsTime + qtTime/2)/squareSize),2) - 3;
        }
    }

    heartBeatHistory.push(nextBeatValue);
}
