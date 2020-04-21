
let breath = 200;
let fullBreathTimer = 0;
let noBreathTimer = 0;
let pressure = 55;

let heartBeat = false;

var breathMode = {
    inhale: 0,
    exhale: 1
};

let currentBreathMode = breathMode.inhale;

let eyeDryness = 0;
let justBlinked = false;

function updateLife() {

    if (playingUIOffsets.breath === 0) {
        if (keyPress[k.x]) {
            if (breath === 0)  {
                currentBreathMode = breathMode.inhale;
                soundAssets.inhale.play();
            } else if (breath === constants.lifeFuncs.breath.fullBreath) {
                currentBreathMode = breathMode.exhale;
                soundAssets.exhale.play();
            } else {
                player.stuckTime = 30;
                soundAssets.cough.play();
            }
            if(Date.now() - keyPromptTime > 3000) {
                --keyPrompts.breath;
                if(keyPrompts.breath > 0) {
                    keyPromptTime = Date.now();
                }
            }
        }

        breathe();
    }

    if (playingUIOffsets.heart === 0) {
        if (keyPress[k.c]) {
            heartbeat();
            if(Date.now() - keyPromptTime > 1250) {
                --keyPrompts.beat;
                if(keyPrompts.beat > 0) {
                    keyPromptTime = Date.now();
                }
            }
        }

        pressure -= 0.1;
        if(~~(pressure*10)/10 === 28) {
            soundAssets.beep2.play();
        } else if(~~(pressure*10)/10 === 42){
            soundAssets.beep1.play();
        }
        if (pressure <= 0) {
            pressure = 0;
            player.die();
        }
    }

    if(playingUIOffsets.blink === 0) {
        eyeDryness++;

        if (keyPress[k.z]) {
            blink();
            if(Date.now() - keyPromptTime > 1250) {
                --keyPrompts.blink;
            }
        }
    }
};

function breathe() {
    switch (currentBreathMode) {
        case breathMode.inhale:
            breath += 1;
            if (breath >= constants.lifeFuncs.breath.fullBreath) {
                breath = constants.lifeFuncs.breath.fullBreath;
                fullBreathTimer++;
                if (fullBreathTimer >= 300) {
                    //cough and lose breath or something
                    handleCough();
                }
                if (fullBreathTimer >= 400) {
                    player.die();
                }
            } else {
                fullBreathTimer = 0;
            }
            break;
        case breathMode.exhale:
            breath -= 2;
            if (breath <= 0) {
                breath = 0;
                noBreathTimer++;
                if (noBreathTimer >= 300) {
                    //cough and lose breath or something
                    handleCough();
                }
                if (noBreathTimer >= 400) {
                    player.die();
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
    pressure += 10;
    if (pressure >= 100) {
        pressure = 100;
        player.die();
    }
    if(pressure>75) {
        soundAssets.beep2.play();
    } else if(pressure>60){
        soundAssets.beep1.play();
    }
    heartBeat = true;

    // Play the heartbeat sound
    soundAssets.heartbeat.play();
};

function blink() {
    eyeDryness = 0;
    justBlinked = true;
}