
class SoundChannel{

    /**
     * Create a sound channel
     * @param {number} max_queue_size Maximum number of sounds that can be queued before sounds are skipped
     */
    constructor(max_queue_size) {
        this.max_size = max_queue_size
    }
}


class SoundContext{

    constructor() {
        
        // Define all sound channels
        this.channels = {
            bgm: new SoundChannel(2)
        }
    }

}

// The global context for sounds
let globalSoundContext = new SoundContext();