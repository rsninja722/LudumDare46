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
    "debug-ding":"/assets/sounds/debug-ding.mp3"
}

// All available sounds
let soundAssets = {
    debug_ding: new SoundSnippet("debug-ding")
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