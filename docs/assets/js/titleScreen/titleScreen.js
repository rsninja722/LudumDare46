var titleScreenState = "main"
var cursor = mousePos;
var firstFrame = true;

function handleTitleScreen() {

    switch (titleScreenState) {

        case "main":
            handleMainScreen();
            break;
        case "credits":
            handleCredits();
            break;
    }

    centerCameraOn(0, 0)


}


function handleMainScreen() {
    var elemStyle = document.getElementById("credits").style;
    if(elemStyle.display === "block") {
        elemStyle.display = "none";
    }
    if (!firstFrame) {
        if (mousePress[0]) {
            if (rectpoint({ x: 400, y: 200, w: 300, h: 50 }, mousePos)) {
                globalState = globalStates.levelTransition;

                // Play the bgm
                soundAssets.backingtrack.playForever();
            }

            if (rectpoint({ x: 400, y: 550, w: 300, h: 50 }, mousePos)) {
                titleScreenState = "credits"
                timer = 0;
            }
        }
    } else {
        firstFrame = false;
    }
}


function handleCredits() {
    var elemStyle = document.getElementById("credits").style;
    if(elemStyle.display === "none") {
        elemStyle.display = "block";
    }
    elemStyle.left = canvases.cvs.offsetLeft + 220 + "px";
    elemStyle.top = canvases.cvs.offsetTop + 20 + "px";

    if (rectpoint({ x: 80, y: 550, w: 140, h: 50 }, mousePos) && mousePress[0]) {
        titleScreenState = "main";
    }
}



function drawTitleScreen() {

    if (titleScreenState === "main") {
        img(sprites.backGround, cw / 2, ch / 2);

        text("GAME TITLE HERE", 50, 50, "white", 8, 1000);
        // rect(415, 200, 300, 50, "green");
        img(sprites["buttonBig" + (rectpoint({ x: 400, y: 200, w: 300, h: 50 }, mousePos) ? "Hover" : "")], 400, 200, 0, 2, 2);
        text("Play!", 340, 185, "#403826", 5, 150);

        // rect(415, 550, 300, 50, "green");
        img(sprites["buttonBig" + (rectpoint({ x: 400, y: 550, w: 300, h: 50 }, mousePos) ? "Hover" : "")], 400, 550, 0, 2, 2);
        text("Credits", 310, 535, "#403826", 5, 150);
    }

    if (titleScreenState === "credits") {
        img(sprites.backGround, cw / 2, ch / 2);

        img(sprites["buttonSmall" + (rectpoint({ x: 80, y: 550, w: 140, h: 50 }, mousePos) ? "Hover" : "")], 80, 550, 0, 2, 2);
        text("Back", 30, 535, "#403826", 5, 150);

        text("*Names are links to their pages", 705, 495, "black", 2, 100);
    }

}