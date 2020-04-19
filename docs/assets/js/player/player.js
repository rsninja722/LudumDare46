class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = constants.player.width;
        this.h = constants.player.height;
        this.hipLeft = { x: this.x + constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
        this.hipRight = { x: this.x - constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
        this.leftLeg = new Leg(this.hipLeft.x, this.hipLeft.y, 50, Math.PI*2.5);
        this.rightLeg = new Leg(this.hipRight.x, this.hipRight.y, 50, Math.PI*2.5);
        this.legSelected = "R";
        this.shouldMoveLeg = false;
        this.collided = false;
        this.lastBodyX = x;
        this.lastBodyY = y;
        this.hover = { active: false, leg: "R" };
    }
}

Player.prototype.getActiveLeg = function(){
    if (this.legSelected === "L") {
        return this.leftLeg;
    }
    return this.rightLeg;
}

Player.prototype.getLockedLeg = function(){
    if (this.legSelected === "R") {
        return this.leftLeg;
    }
    return this.rightLeg;
}

Player.prototype.update = function() {   
    var curLeg = this.getActiveLeg();
    
    // select
    if (this.shouldMoveLeg) { 
        this.moveLeg();
        if(mousePress[0] && collidingWithWorld({x: curLeg.x2, y: curLeg.y2, w:8, h:8})) {

            if (this.legSelected === "R") {
                this.leftLeg.angle += pi;
            } else {
                this.rightLeg.angle += pi;
            }
            this.shouldMoveLeg = false;

            // Play the footstep sound
            playRandomFootstep();
        }
    // deselect
    } else {
       
        var targetPos = mousePosition();
        var curLeg = this.getActiveLeg();
        this.hover.active = false;
        // right
        if (distanceToLineSegment(this.rightLeg.x, this.rightLeg.y, this.rightLeg.x2, this.rightLeg.y2, targetPos.x, targetPos.y) < constants.player.select_range) {
            this.hover.active = true;
            this.hover.leg = "R";
            if(mousePress[0]) {
                this.shouldMoveLeg = true;
                this.legSelected = "R";
                this.hover.active = false;
            }
            //left
        } else if (distanceToLineSegment(this.leftLeg.x, this.leftLeg.y, this.leftLeg.x2, this.leftLeg.y2, targetPos.x, targetPos.y) < constants.player.select_range) {
            this.hover.active = true;
            this.hover.leg = "L";
            if(mousePress[0]) {
                this.shouldMoveLeg = true;
                this.legSelected = "L";
                this.hover.active = false;
            }
        }  
    }
    
    centerCameraOn(this.x,this.y);
}


// leg has been selected, move leg towards mouse
Player.prototype.moveLeg = function(){
    var targetPos = mousePosition();

    // gets active leg & target
    var curLeg = this.getActiveLeg();
    var target = targetPos;

    // Last leg position
    var lastX = curLeg.x2;
    var lastY = curLeg.y2;

    
    // move selected leg towards mouse

    // console.log(curLeg.angle.toPrecision(5),pointTo(curLeg,target).toPrecision(5));
    var angleDif = turn(curLeg.angle, pointTo(curLeg, target), constants.player.leg_speed) - curLeg.angle;
    curLeg.angle += angleDif;
    curLeg.x2 = curLeg.x + curLeg.len * Math.cos(curLeg.angle);
    curLeg.y2 = curLeg.y + curLeg.len * Math.sin(curLeg.angle);


    // Collision
    if(collidingWithWorld({x:curLeg.x2,y:curLeg.y2,w:2,h:2})){
        this.collided = true;
        curLeg.x2 = lastX;
        curLeg.y2 = lastY;
        curLeg.angle -= angleDif;

        // finer movement
        angleDif = turn(curLeg.angle, pointTo(curLeg, target), constants.player.leg_speed/8) - curLeg.angle;
        curLeg.angle += angleDif;
        curLeg.x2 = curLeg.x + curLeg.len * Math.cos(curLeg.angle);
        curLeg.y2 = curLeg.y + curLeg.len * Math.sin(curLeg.angle);


        // Collision
        if(collidingWithWorld({x:curLeg.x2,y:curLeg.y2,w:2,h:2})){
            this.collided = true;
            curLeg.x2 = lastX;
            curLeg.y2 = lastY;
            curLeg.angle -= angleDif;
        }
        return 0;
    }
    
    
    


    if (dist(curLeg, target) > curLeg.len) {
        // move towards mouse
        this.x += Math.cos(pointTo(curLeg, target)) * clamp(dist(curLeg, target) / constants.player.movement_divider, 1, constants.player.max_movement_speed);

        this.y += Math.sin(pointTo(curLeg, target)) * clamp(dist(curLeg, target) / constants.player.movement_divider, 1, constants.player.max_movement_speed);
        this.updateHips();
    }

    // if leg is right update it accordingly
    if (this.legSelected === "R") {
        // set angle to the locked foot to the locked hip
        oppLeg = this.getLockedLeg();
        oppLeg.angle = pointTo({ x: oppLeg.x2, y: oppLeg.y2 }, this.hipRight);
        

        // snap body to a position where the hip is attached to the leg
        this.x = (oppLeg.x2 + oppLeg.len * Math.cos(oppLeg.angle)) - constants.player.hip.offset_x;
        this.y = (oppLeg.y2 + oppLeg.len * Math.sin(oppLeg.angle)) - constants.player.hip.offset_y;

        this.updateHips();

        // make sure each leg ends at the hips
        oppLeg.x = this.hipRight.x;
        oppLeg.y = this.hipRight.y;

        curLeg.x = this.hipLeft.x;
        curLeg.y = this.hipLeft.y;
        // if leg is left update it accordingly
    } else {
        // set angle to the locked foot to the locked hip
        oppLeg = this.getLockedLeg();
        oppLeg.angle = pointTo({ x: oppLeg.x2, y: oppLeg.y2 }, this.hipLeft);


        // snap body to a position where the hip is attached to the leg
        this.x = (oppLeg.x2 + oppLeg.len * Math.cos(oppLeg.angle)) + constants.player.hip.offset_x;
        this.y = (oppLeg.y2 + oppLeg.len * Math.sin(oppLeg.angle)) - constants.player.hip.offset_y;

        this.updateHips();

        // make sure each leg ends at the hips
        oppLeg.x = this.hipLeft.x;
        oppLeg.y = this.hipLeft.y;

        curLeg.x = this.hipRight.x;
        curLeg.y = this.hipRight.y;
    }

    
    if(collidingWithWorld({x:this.x, y:this.y, w:this.w, h:this.h})){
        this.x = this.lastBodyX;
        this.y = this.lastBodyY;
    }


    this.lastBodyX = this.x;
    this.lastBodyY = this.y;
}

Player.prototype.updateHips = function() {
    this.hipLeft = { x: this.x - constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
    this.hipRight = { x: this.x + constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
}


Player.prototype.draw = function() {
    rect(this.x, this.y, this.w, this.h, "green");
    if(this.hover.active) {
        if(this.hover.leg === "R") {
            curCtx.shadowBlur = 10;
            curCtx.shadowColor = "yellow";
            curCtx.lineWidth = 3;
            this.rightLeg.draw();
            curCtx.lineWidth = 1;
            curCtx.shadowBlur = 0;
            curCtx.shadowColor = "black";
            this.leftLeg.draw();
        } else {
            curCtx.shadowBlur = 10;
            curCtx.shadowColor = "yellow";
            curCtx.lineWidth = 3;
            this.leftLeg.draw();
            curCtx.lineWidth = 1;
            curCtx.shadowBlur = 0;
            curCtx.shadowColor = "black";
            this.rightLeg.draw();
        }
    } else {
        this.leftLeg.draw();
        this.rightLeg.draw();
    }
}

// https://github.com/scottglz/distance-to-line-segment/blob/master/index.js
function distanceSquaredToLineSegment2(lx1, ly1, ldx, ldy, lineLengthSquared, px, py) {
    var t; // t===0 at line pt 1 and t ===1 at line pt 2
    if (!lineLengthSquared) {
        // 0-length line segment. Any t will return same result
        t = 0;
    }
    else {
        t = ((px - lx1) * ldx + (py - ly1) * ldy) / lineLengthSquared;

        if (t < 0)
            t = 0;
        else if (t > 1)
            t = 1;
    }

    var lx = lx1 + t * ldx,
        ly = ly1 + t * ldy,
        dx = px - lx,
        dy = py - ly;
    return dx * dx + dy * dy;
}
function distanceSquaredToLineSegment(lx1, ly1, lx2, ly2, px, py) {
    var ldx = lx2 - lx1,
        ldy = ly2 - ly1,
        lineLengthSquared = ldx * ldx + ldy * ldy;
    return distanceSquaredToLineSegment2(lx1, ly1, ldx, ldy, lineLengthSquared, px, py);
}

function distanceToLineSegment(lx1, ly1, lx2, ly2, px, py) {
    return Math.sqrt(distanceSquaredToLineSegment(lx1, ly1, lx2, ly2, px, py));
}




var player = new Player(constants.player.defaultX, constants.player.defaultY);

// why does this stop the legs from glitching on the first step???
player.rightLeg.angle = -pointTo({ x: player.rightLeg.x2, y: player.rightLeg.y2 }, player.hipRight);
player.leftLeg.angle = pointTo({ x: player.leftLeg.x2, y: player.leftLeg.y2 }, player.hipLeft);
player.moveLeg();