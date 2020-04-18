// build
// contains updating during build mode. Used to make levels
/*-------------------------------------------------------------------------------------
                                       How to Use
to enter press \
keys
arrow keys - move camera
rmb - place block
scroll - size block
+z - size horizontally
+x - size faster
c - delete last block
v - print block dimension list
-------------------------------------------------------------------------------------*/

// current block being added
var buildBlock = { x: 0, y: 0, w: 10, h: 10, type: 0 };
var buildBlocks = [];

function buildDraw() {
    for (var i = 0; i < buildBlocks.length; i++) {
        buildBlocks[i].draw();
    }
    rect(buildBlock.x,buildBlock.y,buildBlock.w,buildBlock.h,"green");
}

// should only be called while in build mode
function buildUpdate() {

    // panning
    if (keyDown[k.LEFT]) { moveCamera(-2, 0); }
    if (keyDown[k.RIGHT]) { moveCamera(2, 0); }
    if (keyDown[k.UP]) { moveCamera(0, -2); }
    if (keyDown[k.DOWN]) { moveCamera(0, 2); }

    // move block to mouse
    var mp = mousePosition();
    buildBlock.x = mp.x;
    buildBlock.y = mp.y;

    // print list of block dimensions to be used in levels array
    if (keyPress[k.v]) {
        var world = buildBlocks;
        var finalString = "";
        for (var i = 0; i < world.length; i++) {
            finalString += `${Math.round(world[i].x)},${Math.round(world[i].y)},${Math.round(world[i].w)},${Math.round(world[i].h)},`;
        }
        console.log(finalString);
    }

    // place block
    if (mousePress[2]) {
        buildBlocks.push(new block(buildBlock.x, buildBlock.y, buildBlock.w, buildBlock.h));
        collisionRects.push(buildBlock.x);
        collisionRects.push(buildBlock.y);
        collisionRects.push(buildBlock.w);
        collisionRects.push(buildBlock.h);
    }

    // scroll to increase size 
    // hold z to change dimension being scaled
    // hold x to scale faster
    if (keyDown[k.z]) {
        buildBlock.w += keyDown[k.x] ? scroll * 20 : scroll;
    } else {
        buildBlock.h += keyDown[k.x] ? scroll * 20 : scroll;
    }

    // delete newest block
    if (keyPress[k.c]) {
        buildBlocks.splice(buildBlocks.length - 1, 1);
        collisionRects.splice(collisionRects.length - 4, 4);
    }
}