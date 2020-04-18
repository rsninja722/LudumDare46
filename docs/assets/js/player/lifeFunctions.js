
var breath = 180;
var fullBreathTimer = 0;
var heartRate = 60;

var timeSinceLastBeat = 0;


function updateLife() {
    
    if(keyDown[k.z]) {
        breathe();
    } else {
        breath--;
    }

    if(keyPress[k.x]) {
        heartbeat();
    } else {
        timeSinceLastBeat++;
    }

};

function breathe() {

    breath += 5;
    if(breath >= 200) {
        breath = 200;
        fullBreathTimer++;
        if(fullBreathTimer >= 60) {
            //cough and lose breath or something
        }
    } else {
        fullBreathTimer = 0;
    }

};

function heartbeat() {
    timeSinceLastBeat = 0;

};