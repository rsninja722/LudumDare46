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
var blockData = [942,-184,94,507,942,191,94,507,372,411,1054,67,-316,369,1214,152,-38,270,86,107,-166,243,125,127,238,320,45,127,273,284,45,127,309,248,45,127,341,215,45,127,377,179,45,127,412,143,45,127,450,107,45,127,603,105,285,196,777,27,285,196,-989,23,175,959,154,-441,2555,51];
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