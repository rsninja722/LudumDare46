// UI for title screen
function drawTitleScreenUI() {};

// UI for level transition
function drawLevelTransitionUI() {};

// UI for playing
function drawPlayingUI() {};

//UI for pause screen
function drawPausedUI() {};

//UI for game end
function drawEndUI() {};

// Construct a rectangular UI
function rectUI() {};

//Heart rate monitor history 
var heartBeatHistory = [].fill(0,0, constants.ui.heartRate.history_length);

//Shift accumulation
var shiftAccum = 0;

//Beat progression
var beatTimeElapsed = 0;

// Draw heartbeat UI
function heartBeatUI(x, y, width, height){

    shiftAccum += constants.ui.heartRate.scroll_speed;
    if(shiftAccum>=1){
        shiftAccum%=1;
        heartBeatHistory.shift();
        pushNextBeatValue();
    }

    if(timeSinceLastBeat===0){
        beatTimeElapsed = 0;
    }

    for (let index = 0; index < heartBeatHistory.length; index++) {
        const qrsValueAtPosition = heartBeatHistory[index];
        line(x+index, y+(2*height/3), x+index, y+(2*height/3)+qrsValueAtPosition);   
    }
}

function pushNextBeatValue(){
    var nextBeatValue;

    beatTimeElapsed %= constants.ui.heartRate.complex_width;
    if(beatTimeElapsed<=constants.ui.heartRate.pr_width){
        nextBeatValue = -0.25((x - 1.5)**2) + 0.5625;
    } else if (beatTimeElapsed >= constants.ui.heartRate.pr_width + 1 && beatTimeElapsed <= constants.ui.heartRate.pr_width + 1 + constants.ui.heartRate.qrs_width/4) {
    }

    heartBeatHistory.push(nextBeatValue);
}
