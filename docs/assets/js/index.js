// Handle starting the pre-load animation
var page_preloader = new Preloader();
page_preloader.show(true);

images = [
    ""
];

audio = [
    ""
];

var globalStates = {
    titleScreen:0,
    starting:1,
    playing:2,
    paused:3,
    end:4
};
var globalState = globalStates.titleScreen;

function update() {
    switch(globalState) {
        // title screen
        case globalStates.titleScreen:

            break;
        // starting
        case globalStates.starting:

            break;
        // playing
        case globalStates.playing:

            break;
        // paused
        case globalStates.paused:

            break;
        // end
        case globalStates.end:

            break;
    }
}

function input() {

}

function draw() {

}

function absoluteDraw() {

}

function onAssetsLoaded() {


}

setup(60);

// Hide the preloader
// This should actually run after all assets have been downloaded
page_preloader.hide(false);