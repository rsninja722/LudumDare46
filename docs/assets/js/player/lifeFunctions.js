
let breath = 180;
let fullBreathTimer = 0;
let noBreathTimer = 0;
let heartRate = 60;

let heartBeat = false;

var breathMode = {
    inhale: 0,
    exhale: 1
};

let currentBreathMode = breathMode.exhale;



function updateLife() {
    
    if(keyDown[k.UP]) {
        currentBreathMode = breathMode.inhale;
    }

    if(keyDown[k.DOWN]) {
        currentBreathMode = breathMode.exhale;
    }

    breathe();

    if(keyPress[k.x]) {
        heartbeat();
    }
};

function breathe() {
    switch (currentBreathMode) {
        case breathMode.inhale:
            breath += 1;
            if(breath >= constants.lifeFuncs.breath.fullBreath) {
                breath = constants.lifeFuncs.breath.fullBreath;
                fullBreathTimer++;
                if(fullBreathTimer >= 180) {
                    //cough and lose breath or something
                }
            } else {
                fullBreathTimer = 0;
            }
            break;
        case breathMode.exhale:
            breath -= 1;
            if(breath <= 0) {
                breath = 0;
                noBreathTimer++;
                if(noBreathTimer >= 180) {
                    //cough and lose breath or something
                }
            } else {
                noBreathTimer = 0;
            }
            break;
    }
};

function heartbeat() {
    heartBeat = true;
};