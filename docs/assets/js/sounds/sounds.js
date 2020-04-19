/**
 * This file handles all sound assets, and loading them
 * To add a new sound asset:
 *  1) Make a mapping from the asset name to it's filename in soundAssetMap
 *  2) Define the SoundSnippet in soundAssets
 *
 * The preloader will handle asset loading for you. 
 * Make sure to check the console for any errors with loading your file
 */


// A mapping of asset names to their files
// This exists to give nicer names to files
let soundAssetMap = {
    "debug-ding": "./assets/sounds/debug-ding.mp3",
    "footstep1":"./assets/sounds/footsteps/footstep1.mp3",
    "footstep2":"./assets/sounds/footsteps/footstep2.mp3",
    "footstep3":"./assets/sounds/footsteps/footstep3.mp3",
    "footstep4":"./assets/sounds/footsteps/footstep4.mp3",
    "footstep5":"./assets/sounds/footsteps/footstep5.mp3",
    "footstep6":"./assets/sounds/footsteps/footstep6.mp3"
}

// All available sounds
let soundAssets = {
    debug_ding: new SoundSnippet("debug-ding", audioAssetType.sfx),
    footstep1: new SoundSnippet("footstep1", audioAssetType.sfx),
    footstep2: new SoundSnippet("footstep2", audioAssetType.sfx),
    footstep3: new SoundSnippet("footstep3", audioAssetType.sfx),
    footstep4: new SoundSnippet("footstep4", audioAssetType.sfx),
    footstep5: new SoundSnippet("footstep5", audioAssetType.sfx),
    footstep6: new SoundSnippet("footstep6", audioAssetType.sfx)
}

/**
 * Play a random footstep sound because ReAlIsM
 */
function playRandomFootstep() {

    // There has to be a one-liner somewhere in the game...
    [soundAssets.footstep1, soundAssets.footstep2, soundAssets.footstep3, soundAssets.footstep4, soundAssets.footstep5, soundAssets.footstep6][Math.min(Math.floor(Math.random() * Object.keys(soundAssets).length - 1), Object.keys(soundAssets).length - 1)].play();
}

/**
 * Cache all sounds in browser, then notify a callback of success
 * @param {function} callback  Callback for completion
 */
function preCacheSounds(callback) {

    // Counter for number of sounds cached
    let cachedCount = 0;

    Object.keys(soundAssets).forEach((key) => {

        // Get the SoundSnippet
        let sound = soundAssets[key];

        // Cache the sound
        sound.cache(() => {

            // Incr the cache count
            cachedCount += 1;

            // If this is the last sound, fire off the callback
            if (cachedCount == Object.keys(soundAssets).length) {
                callback();
            }

        });

    });


    // Spawn a notifier for loading issues
    setTimeout(() => {

        // If not all sounds have been cached by the time this is called, send a warning
        if (cachedCount < Object.keys(soundAssets).length) {
            console.warn(`[preCacheSounds] Only ${cachedCount} of ${Object.keys(soundAssets).length} sounds have been cached after 2 seconds. Is there a missing asset? or is the user on a slow connection?`);
        }

    }, 2000);

}