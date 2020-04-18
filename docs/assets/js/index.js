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
    titleScreen: 0,
    levelTransition: 1,
    playing: 2,
    paused: 3,
    end: 4,
    building: 5
};
var globalState = globalStates.playing;

function update() {
    switch (globalState) {
        // title screen
        case globalStates.titleScreen:

            break;
        // level transition
        case globalStates.levelTransition:

            break;
        // playing
        case globalStates.playing:
            handlePlaying();
            break;
        // paused
        case globalStates.paused:

            break;
        // end
        case globalStates.end:

            break;
        //building - to be used only in development
        case globalStates.building:
            buildUpdate();
            break;
    }
}

function draw() {
    switch (globalState) {
        // title screen
        case globalStates.titleScreen:

            break;
        // level transition
        case globalStates.levelTransition:

            break;
        // playing
        case globalStates.playing:
            drawWorldBlocks();
            break;
        // paused
        case globalStates.paused:

            break;
        // end
        case globalStates.end:

            break;
        //building - to be used only in development
        case globalStates.building:
            buildDraw();
            break;
    }
}

function absoluteDraw() {
    switch (globalState) {
        // title screen
        case globalStates.titleScreen:
            drawTitleScreenUI();
            break;
        // level transition
        case globalStates.levelTransition:
            drawLevelTransitionUI();
            break;
        // playing
        case globalStates.playing:
            drawPlayingUI();
            break;
        // paused
        case globalStates.paused:
            drawPausedUI();
            break;
        // end
        case globalStates.end:
            drawEndUI();
            break;
    }
}

function onAssetsLoaded() {


}

setup(60);

// Hide the preloader
// This should actually run after all assets have been downloaded
page_preloader.hide(false);