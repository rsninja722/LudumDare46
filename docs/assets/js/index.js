// Handle starting the pre-load animation
var page_preloader = new Preloader();
page_preloader.show(true);

images = [
    "assets/images/",
    "level.png",
    "level_2.png"
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
var globalState = globalStates.titleScreen;

function update() {
        
    switch (globalState) {
        // title screen
        case globalStates.titleScreen:
            handleTitleScreen();
            break;
        // level transition
        case globalStates.levelTransition:

            break;
        // playing
        case globalStates.playing:
            handlePlaying();
            player.update();
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

    // If draw is being called, the user has interacted with the page at least once.
    // This signal can be used to notify the audio permission handler
    unlockAudioPermission();

    // Handle game state
    switch (globalState) {

        // title screen
        case globalStates.titleScreen:
            drawTitleScreen();
            break;
        // level transition
        case globalStates.levelTransition:
            handleTransition();
            break;
        // playing
        case globalStates.playing:
            camera.zoom = 1;
            drawWorldBlocks();
            imgIgnoreCutoff(sprites.level_2,0,0,0,4,4);
            player.draw();
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

/* Preload actions */

// To make something happen before the preloader is hidden, add it to this list
// The function must take a callback that will be run when the function finishes
let actions = [preCacheSounds];
let actionsCompleted = 0;

// Loop through every action, and load it
actions.forEach((action) => {
    
    // Run the action & handle loading
    action(() => {
        
        // Incr the number of successfully loaded actions
        actionsCompleted += 1;

        // If this is the last aciton, hide the loader
        if (actionsCompleted == actions.length) {
            page_preloader.hide(false);
        }
    })
});
