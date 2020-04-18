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
var heartBeatHistory = []
    heartBeatHistory.length = constants.ui.heartRate.history_length;
    heartBeatHistory.fill(0);

//Shift accumulation
var shiftAccum = 0;

//Beat progression
var beatTimeElapsed = 0;

// Draw heartbeat UI
function heartBeatUI(x, y, width, height){

    shiftAccum += constants.ui.heartRate.scroll_speed;
    if(shiftAccum>=1){
        shiftAccum%=1;
        beatTimeElapsed += 0.04;
        heartBeatHistory.shift();
        pushNextBeatValue();
    }

    if(timeSinceLastBeat===0){
        beatTimeElapsed = 0;
    }

    rect(x+width/2,y+height/2,width,height,"black");
    for (let index = 0; index < heartBeatHistory.length; index++) {
        const qrsValueAtPosition = heartBeatHistory[index];
        const qrsValueAtNextPosition = heartBeatHistory[index+1];
        line(x+(index*width/heartBeatHistory.length), y+(2*height/3)+(qrsValueAtPosition*width/heartBeatHistory.length), x+((index+1)*width/heartBeatHistory.length), y+(2*height/3)+(qrsValueAtNextPosition*width/heartBeatHistory.length), "red");
    }
}

function pushNextBeatValue(){
    var nextBeatValue = 0;

    const squareSize = constants.ui.heartRate.square_size;
    const complexTime = constants.ui.heartRate.complex_width*squareSize;
    const prTime = constants.ui.heartRate.pr_width*squareSize;
    const qrsTime = constants.ui.heartRate.qrs_width*squareSize;
    const qtTime = constants.ui.heartRate.qt_width*squareSize;


    if(beatTimeElapsed<=complexTime) {
        if (beatTimeElapsed <= prTime) {
            nextBeatValue = 0.5*(Math.pow((beatTimeElapsed/squareSize - (prTime/2/squareSize)), 2)) - 2;
        } else if (beatTimeElapsed > prTime + squareSize && beatTimeElapsed <= prTime + squareSize + (qrsTime / 4)) {
            nextBeatValue = -4 + beatTimeElapsed/squareSize;
        } else if (beatTimeElapsed > prTime + squareSize + qrsTime / 4 && beatTimeElapsed <= prTime + squareSize + qrsTime / 2) {
            nextBeatValue = -14 * (beatTimeElapsed/squareSize - 4.5) - 0.5;
        } else if (beatTimeElapsed > prTime + squareSize + qrsTime / 2 && beatTimeElapsed <= prTime + squareSize + (3*qrsTime / 4)) {
            nextBeatValue = 7 * (beatTimeElapsed/squareSize - 5) - 6.5;
        } else if (beatTimeElapsed > prTime + squareSize + (3*qrsTime / 4) && beatTimeElapsed <= prTime + squareSize + qrsTime) {
            nextBeatValue = 2 * (beatTimeElapsed/squareSize - 6);
        } else if (beatTimeElapsed > prTime + squareSize*2 + qrsTime && beatTimeElapsed <= prTime + squareSize*2 + qrsTime + qtTime) {
            nextBeatValue = 0.5 * Math.pow((beatTimeElapsed/squareSize - (prTime + squareSize*2 + qrsTime + qtTime/2)/squareSize),2) - 3;
        }
    }

    heartBeatHistory.push(nextBeatValue);
}
