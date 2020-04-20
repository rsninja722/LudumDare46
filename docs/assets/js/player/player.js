class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = constants.player.width;
        this.h = constants.player.height;
        this.hipLeft = { x: this.x + constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
        this.hipRight = { x: this.x - constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
        this.leftLeg = new Leg(this.hipLeft.x, this.hipLeft.y, constants.player.leg_length, Math.PI*2.5);
        this.rightLeg = new Leg(this.hipRight.x, this.hipRight.y, constants.player.leg_length, Math.PI*2.5);
        this.leftArm = new Arm(this.hipLeft.x + 8, this.y - constants.player.hip.offset_y, 64, Math.PI/2);
        this.rightArm = new Arm(this.hipRight.x - 8, this.y - constants.player.hip.offset_y, 64, Math.PI/2);
        this.head = {x:this.x,y:this.y-this.h/2,angle:Math.PI*1.5};
        this.legSelected = "R";
        this.shouldMoveLeg = false;
        this.collided = false;
        this.lastBodyX = x;
        this.lastBodyY = y;
        this.hover = { active: false, leg: "R" };
        this.holdingBox = false;
        this.armVel = 1;
        this.stuckTime = 0;
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

Player.prototype.die = function() {
    console.warn("player is big ded, rip");
}

Player.prototype.update = function() {   
    var curLeg = this.getActiveLeg();
    
    if(this.stuckTime > 0) {
        --this.stuckTime;
    }
    // deselect
    if (this.shouldMoveLeg && this.stuckTime === 0) { 
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
    // select
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

    // place box
    if(this.holdingBox && this.x > -275 && this.y < 100) {
        this.holdingBox = false;
        boxOnTable = true;
    }

    // god mode
    // if(keyDown[k.w]) {
    //     this.y-=5;
    // }
    // if(keyDown[k.s]) {
    //     this.y+=5;
    // }
    // if(keyDown[k.a]) {
    //     this.x-=5;
    // }
    // if(keyDown[k.d]) {
    //     this.x+=5;
    // }

    var halfPI = pi/2;
    if(this.leftArm.angle > halfPI) {
        this.leftArm.angle -= 0.05 * this.armVel;
    }
    if(this.leftArm.angle < halfPI) {
        this.leftArm.angle += 0.05 * this.armVel;
    }
    if(this.rightArm.angle > halfPI) {
        this.rightArm.angle -= 0.05 * this.armVel;
    }
    if(this.rightArm.angle < halfPI) {
        this.rightArm.angle += 0.05 * this.armVel;
    }
    this.armVel += 0.05;

    if(this.head.angle > halfPI + pi) {
        this.head.angle -= 0.05;
    }
    if(this.head.angle < halfPI + pi) {
        this.head.angle += 0.05;
    }

    var arm = this.leftArm;
    arm.x = this.x + constants.player.hip.offset_x + 8;
    arm.y = this.y - constants.player.hip.offset_y;
    arm.x2 = arm.x + arm.len * Math.cos(arm.angle);
    arm.y2 = arm.y + arm.len * Math.sin(arm.angle);

    var arm = this.rightArm;
    arm.x = this.x - constants.player.hip.offset_x - 8;
    arm.y = this.y - constants.player.hip.offset_y;
    arm.x2 = arm.x + arm.len * Math.cos(arm.angle);
    arm.y2 = arm.y + arm.len * Math.sin(arm.angle);

    this.head.x = this.x;
    this.head.y = this.y-this.h/2;
    
    centerCameraOn(this.x,this.y);
    // camera limits
    if(camera.x > 898) {
        camera.x = 898;
    }
    if(camera.x < -98) {
        camera.x = -98;
    }
    if(camera.y < 245) {
        camera.y = 245;
    }
    if(camera.y > 350) {
        camera.y = 350;
    }
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

    // arm and head flailing
    var bodyDifY = this.lastBodyY - this.y;
    if(!isNaN(bodyDifY)) {
        if(bodyDifY < 0) {
            this.leftArm.angle -= Math.abs(bodyDifY)/10;
            this.rightArm.angle += Math.abs(bodyDifY)/10;
        }
    }
    var bodyDifX = this.lastBodyX - this.x;
    if(!isNaN(bodyDifX)) {
        this.leftArm.angle -= bodyDifX/20;
        this.rightArm.angle -= bodyDifX/20;
        this.head.angle += bodyDifX/30;
    }

    this.lastBodyX = this.x;
    this.lastBodyY = this.y;
    this.armVel = 1;
}

Player.prototype.updateHips = function() {
    this.hipLeft = { x: this.x - constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
    this.hipRight = { x: this.x + constants.player.hip.offset_x, y: this.y + constants.player.hip.offset_y };
}


Player.prototype.draw = function() {
    // rect(this.x, this.y, this.w, this.h, "green");
    img(sprites.playerBody,this.x,this.y,0,4,4);
    
    img(sprites.playerHead,this.head.x + Math.cos(this.head.angle) * 20,this.head.y + Math.sin(this.head.angle) * 20,this.head.angle,4,4);

    if(this.stuckTime) {
        img(sprites.playerArm,this.x,this.y-50,2,4,4);
    } else {
        this.leftArm.draw();
    }
    
    this.rightArm.draw();

    if(this.holdingBox) {
        img(sprites.boxNoOutline,this.leftArm.x2 - Math.cos(this.leftArm.angle)*15,this.leftArm.y2- Math.sin(this.leftArm.angle)*15,this.leftArm.angle,4,4);
    }
    



    
    if(this.hover.active) {
        if(this.hover.leg === "R") {
            img(sprites.playerLeg,(this.leftLeg.x+this.leftLeg.x2)/2,(this.leftLeg.y+this.leftLeg.y2)/2,this.leftLeg.angle+pi/2,4,4);
            img(sprites.playerLegActive,(this.rightLeg.x+this.rightLeg.x2)/2,(this.rightLeg.y+this.rightLeg.y2)/2,this.rightLeg.angle+pi/2,4,4);
        } else {
            img(sprites.playerLegActive,(this.leftLeg.x+this.leftLeg.x2)/2,(this.leftLeg.y+this.leftLeg.y2)/2,this.leftLeg.angle+pi/2,4,4);
            img(sprites.playerLeg,(this.rightLeg.x+this.rightLeg.x2)/2,(this.rightLeg.y+this.rightLeg.y2)/2,this.rightLeg.angle+pi/2,4,4);
        }
    } else {
        img(sprites.playerLeg,(this.leftLeg.x+this.leftLeg.x2)/2,(this.leftLeg.y+this.leftLeg.y2)/2,this.leftLeg.angle+pi/2,4,4);
    img(sprites.playerLeg,(this.rightLeg.x+this.rightLeg.x2)/2,(this.rightLeg.y+this.rightLeg.y2)/2,this.rightLeg.angle+pi/2,4,4);
    }
    

    if(this.shouldMoveLeg) {
        if(this.legSelected === "R") {
            var active = collidingWithWorld({x: this.rightLeg.x2, y: this.rightLeg.y2, w:8, h:8});
            img(sprites.playerFoot,this.leftLeg.x2,this.leftLeg.y2,0,-5,5);
            img(sprites["playerFoot" + (active ? "Active" : "")],this.rightLeg.x2,this.rightLeg.y2,0,5,5);
        } else {
            var active = collidingWithWorld({x: this.leftLeg.x2, y: this.leftLeg.y2, w:8, h:8});
            img(sprites["playerFoot" + (active ? "Active" : "")],this.leftLeg.x2,this.leftLeg.y2,0,-5,5);
            img(sprites.playerFoot,this.rightLeg.x2,this.rightLeg.y2,0,5,5);
        }
    } else {
        img(sprites.playerFoot,this.leftLeg.x2,this.leftLeg.y2,0,-5,5);
        img(sprites.playerFoot,this.rightLeg.x2,this.rightLeg.y2,0,5,5);
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