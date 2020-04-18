/**
 * This file contains classes for playing sounds. 
 * The SoundContext works by providing multiple audio channels, 
 * just like an old ATARI, or even GameBoy sound system. Each 
 * channel can be controlled individually.
 * 
 * ---- Usage ----
 * 
 * // Load all sounds
 * preCacheSounds(()=>{
 *      // Code can be run here as soon as all sounds are loaded
 *      // ...
 * });
 * 
 * // Play a sound using channels
 * globalSoundContext.playSound(globalSoundContext.channels.<channel>, sounds.<soundname>);
 * 
 * // Just play a sound now
 * globalSoundContext.playSoundNow(sounds.<soundname>);
 * 
 * // Stop a channel
 * globalSoundContext.mute(globalSoundContext.channels.<channel>);
 */

/**
 * A sound channel can play 1 sound at a time, and supports sound queueing
 */
class _SoundChannel {

    /**
     * Create a sound channel
     * @param {number} max_queue_size Maximum number of sounds that can be queued before sounds are skipped
     */
    constructor(max_queue_size) {
        this.max_size = max_queue_size
        this.sound_queue = []
    }

    /**
     * Add a snippet to the queue
     * @param {SoundSnippet} snippet 
     */
    enqueue(snippet) {

        console.log(this.sound_queue)

        // If the queue is full, cut out the next sound in the queue to make room
        // if (this.sound_queue.length > this.max_size) {
        //     this.sound_queue.splice(1, 1);
        // }

        // Append the sound to the queue
        this.sound_queue.push(snippet);

        // If this is the first sound in the queue, spawn a watcher job, and play it
        if (this.sound_queue.length == 1) {
            this.sound_queue[0].play();
            this._spawnWatcher(this.sound_queue[0]);
        }
    }

    /**
     * Start a job to run when the sound finishes to remove the sound from the queue
     * @param {SoundSnippet} snippet 
     */
    _spawnWatcher(snippet) {

        // Read the snippet length
        let length = snippet.getLengthSeconds();

        // Spawn a clean action for that time in the future
        setTimeout(() => {
            this._cleanQueue(snippet);
        }, length * 1000);
    }

    /**
     * This should be run when every sound finishes. This will remove that 
     * sound from from the queue, start the next sound, and spawn a 
     * new watcher for that sound.
     * @param {SoundSnippet} snippet 
     */
    _cleanQueue(snippet) {

        // Get the snippet hash
        let hash = snippet.getHash();

        // Make sure there are actually sounds playing
        if (this.sound_queue.length > 0) {

            // If the first snippet in the queue matches this hash, remove it.
            // If not, something must have happened. Just ignore it, and move on
            if (this.sound_queue[0].getHash() == hash) {

                // Popoff the snippet
                this.sound_queue.shift();

            }

            // Spawn a watcher for the next sound & play it
            if (this.sound_queue.length > 0) {
                this.sound_queue[0].play();
                this._spawnWatcher(this.sound_queue[0]);
            }
        }
    }

    /**
     * Clear the entire queue, and stop all sounds
     */
    clear() {

        // Stop every sound
        this.sound_queue.forEach((sound) => {
            sound.stop();
        })

        // Clear the queue
        this.sound_queue = [];

    }
}


class _SoundContext {

    constructor() {

        // Define all sound channels
        this.channels = {
            bgm: new _SoundChannel(3)
        }
    }

    /**
     * Play a sound in a channel
     * @param {*} channel 
     * @param {SoundSnippet} snippet 
     */
    playSound(channel, snippet) {
        console.log(`[SoundContext] Playing snippet: ${snippet.getName()}`);
        channel.enqueue(snippet);
    }

    /**
     * Play a sound right now
     * @param {SoundSnippet} snippet 
     */
    playSoundNow(snippet) {
        snippet.play();
    }

    /**
     * Stop all sounds in a channel
     * @param {*} channel 
     */
    mute(channel) {
        channel.clear();
    }

}

// The global context for sounds
let globalSoundContext = new _SoundContext();