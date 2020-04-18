
// Counter for hash generation
let _hashCounter = 0;

// Audio types
let audioAssetType = {
    bgm: 1,
    sfx:2
}

class SoundSnippet {

    /**
     * Load a sound asset to a snipper
     * @param {string} asset_name Asset name as defined in soundassetmap.js
     * @param {*} asset_type Asset type. This changes the volume channel
     */
    constructor(asset_name, asset_type) {

        // Store asset name
        this.asset_name = asset_name;

        // Compute an asset hash
        this.asset_hash = CryptoJS.MD5(`ASSET:${asset_name}::${_hashCounter}`);
        _hashCounter += 1;

        // Read actual asset path
        this.assetPath = soundAssetMap[asset_name];

        this.assetType = asset_type;

    }

    /**
     * Cache this sound, then notify a callback of completion
     * @param {function} callback callback to notify
     */
    cache(callback) {

        // Set the audio SRC
        this.audio = new Howl({src:[this.assetPath]});

        // Create a callback for loading finished
        this.audio.once("load", callback);

        // Configure a thread for updating the clip volume
        setInterval(() => {
            
            // Read the asset volume from the settings screen
            let audio_volume = (this.assetType == 1)? volume.bgm :volume.sfx;

            // Configure the clip volume
            this.audio.volume(audio_volume);

        }, 500);

    }


    play() {

        // If autoplay is disabled, we notify the console
        if (canPlayAudio()) {
            // Play the snippet
            this.audio.play();
        } else {
            console.warn("[SoundSnippet] Tried to play audio with autoplay disabled. The user must press the play button before you can play audio");
        }

    }

    stop() {

        // Stop the snippet
        this.audio.stop();

    }

    /**
     * Get the sound length in seconds
     */
    getLengthSeconds() {
        return this.audio.duration;
    }

    /**
     * Get the asset name
     */
    getName() {
        return this.asset_name;
    }

    /**
     * Get this asset's hash. This can be used for comparing objects efficiently.
     */
    getHash() {
        return this.asset_hash;
    }
}