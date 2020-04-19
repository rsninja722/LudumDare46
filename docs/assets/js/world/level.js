var collisionRects = [];
class block {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        rect(this.x, this.y, this.w, this.h, "blue");
    }
}

// create blocks
var blockData = [705,-8,491,64,460,27,74,64,425,64,74,64,389,99,74,64,352,135,74,64,321,167,74,64,285,203,74,64,249,239,74,64,-18,299,3314,111,-43,205,59,90,-168,199,128,108,-168,144,158,25,-978,-101,158,984,14,-398,1958,85,928,-192,58,345,664,-101,25,133,867,-102,25,133,765,-97,185,67];
for (let i = 0, l = blockData.length; i < l; i += 4) {
    collisionRects.push(new block(blockData[i], blockData[i + 1], blockData[i + 2], blockData[i + 3]));
}

function drawWorldBlocks() {
    for (var i = 0; i < collisionRects.length; i++) {
        collisionRects[i].draw();
    }
}

function collidingWithWorld(objectWithXYWH) {
    for (var i = 0; i < collisionRects.length; i++) {
        if (rectrect(collisionRects[i], objectWithXYWH)) {
            return true;
        }
    }
    return false;
}