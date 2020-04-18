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
var blockData = [631,407,590,461,316,427,40,420,277,447,40,380,238,466,40,340,199,486,40,300,161,507,40,260,121,527,40,220,82,545,40,180,-407,561,1300,150,-1000,350,120,570,-281,483,120,70,-191,481,35,35,878,145,95,776,734,172,195,76];
for (let i = 0, l = blockData.length; i < l; i += 4) {
    collisionRects.push(new block(blockData[i], blockData[i + 1], blockData[i + 2], blockData[i + 3]));
}

function drawWorldBlocks() {
    for (var i = 0; i < collisionRects.length; i++) {
        collisionRects[i].draw();
    }
}

function collidingWithWorld(objectWithXYWH) {
    for (let i = 0, l = collisionRects.length; i < l; i++) {
        if (rectrect(collisionRects[i], objectWithXYWH)) {
            return i;
        }
    }
    return false;
}