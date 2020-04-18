
let breath = 180;
let fullBreathTimer = 0;
let heartRate = 60;

let heartBeat = false;


function updateLife() {
    
    if(keyDown[k.z]) {
        breathe();
    } else {
        breath--;
    }

    if(keyPress[k.x]) {
        heartbeat();
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
    heartBeat = true;

};