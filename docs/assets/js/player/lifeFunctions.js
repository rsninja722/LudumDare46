
let breath = 180;
let fullBreathTimer = 0;
let noBreathTimer = 0;
let pressure = 50;

let heartBeat = false;

var breathMode = {
    inhale: 0,
    exhale: 1
};

let currentBreathMode = breathMode.exhale;

let eyeDryness = 0;
let justBlinked = false;

function updateLife() {
    
    if(keyDown[k.x]) {
        if (breath === 0) {
            soundAssets.inhale.play();
            currentBreathMode = breathMode.inhale;
        }
        else if (breath === constants.lifeFuncs.breath.fullBreath) {
            soundAssets.exhale.play();
            currentBreathMode = breathMode.exhale;
        }
    }

    breathe();

    if(keyPress[k.c]) {
        heartbeat();
    }

    pressure-=0.1;
    if(pressure<=0){
        pressure = 0;
    }

    eyeDryness++;

    if(keyPress[k.z]) {
        blink();
    }
};

function breathe() {
    switch (currentBreathMode) {
        case breathMode.inhale:
            breath += 1;
            if(breath >= constants.lifeFuncs.breath.fullBreath) {
                breath = constants.lifeFuncs.breath.fullBreath;
                fullBreathTimer++;
                if(fullBreathTimer >= 600) {
                    //cough and lose breath or something
                    handleCough();
                }
            } else {
                fullBreathTimer = 0;
            }
            break;
        case breathMode.exhale:
            breath -= 2;
            if(breath <= 0) {
                breath = 0;
                noBreathTimer++;
                if(noBreathTimer >= 300) {
                    //cough and lose breath or something
                    handleCough();
                }
            } else {
                noBreathTimer = 0;
            }
            break;
    }
};

// Tracker for if we are currently coughing
let _nextCoughAllowedTime = 0;

/**
 * Handle player coughing without spamming the sound buffer
 */
function handleCough() {

    // Only cough if we are past the cough time
    if (getCurrentTimeSeconds() >= _nextCoughAllowedTime) {

        console.log("[LifeFunctions] Coughing")
        
        // Set the next allowed cough time
        _nextCoughAllowedTime = getCurrentTimeSeconds() + constants.lifeFuncs.breath.cough_interval_secs;

        // Play the cough audio
        soundAssets.cough.play();
    }
}

function heartbeat() {
    pressure+=10;
    if(pressure>=100){
        pressure = 100;
    }
    heartBeat = true;

    // Play the heartbeat sound
    soundAssets.heartbeat.play();
};

function blink() {
    eyeDryness = 0;
    justBlinked = true;
}