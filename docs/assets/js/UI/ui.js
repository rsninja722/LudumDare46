// UI for title screen
function drawTitleScreenUI() {
}

// UI for level transition
function drawLevelTransitionUI() {
}

// UI for playing
function drawPlayingUI() {

    // cartesianRect(0,ch/3*2, cw, ch/3, "#333333")

    //Heart Rate Monitor
    heartBeatUI(cw/4*3-8,ch/8*7-8,cw/4,ch/8);

    //Respiration Monitor
    respiratoryUI(cw/8*5,ch/8*7-8, cw/16, ch/8);
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

function respiratoryUI(x, y, width, height){
    cartesianRect(x,y,width,height, "rgb("+noBreathTimer/180*255+","+0+","+0+")");
    cartesianRect(x,y+(height-breath/constants.lifeFuncs.breath.fullBreath*height), width, breath/constants.lifeFuncs.breath.fullBreath*height, "rgb("+255+","+(255-fullBreathTimer/180*255)+","+(255-fullBreathTimer/180*255)+")");
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

    //Pressure Meter
    rect(x+width-8,y+height/2,16,height,"red");
    rect(x+width-8,y+height/2,16,height/2,"yellow");
    rect(x+width-8,y+height/2,16,height/6,"green");
    let pressureHeight = Math.max(Math.min(y+height-(pressure/constants.lifeFuncs.cardio.optimalPressure*height/2),y+height),y);
    line(x+width-16, pressureHeight,x+width,pressureHeight, 2,"black")

    //Graph
    for (let index = 0; index < heartBeatHistory.length; index++) {
        const qrsValueAtPosition = heartBeatHistory[index];
        const qrsValueAtNextPosition = heartBeatHistory[index+1];
        line(x+(index*(width-16)/heartBeatHistory.length), y+(2*height/3)+(qrsValueAtPosition*(width-16)/heartBeatHistory.length), x+((index+1)*(width-16)/heartBeatHistory.length), y+(2*height/3)+(qrsValueAtNextPosition*(width-16)/heartBeatHistory.length),Math.min(3,Math.max(3/beatTimeElapsed,1)), "red");
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
