/**
 * This file just exists to keep track of weather the user has interacted with the 
 * webpage. Most browsers will block autoplay if no interaction has been made.
 */


// Tracker for permission unlock
let _audioPermUnlock = false;

/**
 * Call this when the user interacts with the page
 */
function unlockAudioPermission() {
    _audioPermUnlock = true;
}

/**
 * Check if autoplay is enabled
 */
function canPlayAudio() {
    return _audioPermUnlock;
}