class Player {

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 20;
        this.hipLeft = {x:this.x-5,y:this.y+10};
        this.hipRight = {x:this.x+5,y:this.y+10};
        this.leftLeg = new Leg(this.hipLeft.x,this.hipLeft.y,50,-Math.PI/4);
        this.rightLeg = new Leg(this.hipRight.x, this.hipRight.y, 50, Math.PI/2);
        this.legSelected = "R";
        this.shouldMoveLeg = true;
        this.collided = false;
        this.lastBodyX = x;
        this.lastBodyY = y;
    }

    

}

Player.prototype.getActiveLeg = function(){
    if(this.legSelected === "L"){
        return this.leftLeg;
    }
    return this.rightLeg;
}

Player.prototype.getLockedLeg = function(){
    if(this.legSelected === "R"){
        return this.leftLeg;
    }
    return this.rightLeg;
}

// leg has been selected, move leg towards mouse
Player.prototype.moveLeg = function(){

    // Stops if we shouldn't move leg
    if(!this.shouldMoveLeg){
        return 0;
    }
    
    // gets active leg & target
    var curLeg = this.getActiveLeg();
    var target = mousePos;

    // Last leg position
    var lastX = curLeg.x2;
    var lastY = curLeg.y2;

    // var angle = turn(pointTo(curLeg,{x:curLeg.x2,y:curLeg.y2}),pointTo(curLeg,target),0.1);
    var angle = pointTo(curLeg,target);
    
    curLeg.x2 = curLeg.x + curLeg.len * Math.cos(angle);
    curLeg.y2 = curLeg.y + curLeg.len * Math.sin(angle);

    console.log(this.legSelected);
    debugger
    // Collision
    if(collidingWithWorld({x:curLeg.x2,y:curLeg.y2,w:4,h:4})){
        this.collided = true;
        curLeg.x2 = lastX;
        curLeg.y2 = lastY;
        return 0;
       
    }
    
    
    if(collidingWithWorld({x:this.x, y:this.y, w:this.w, h:this.h})){
        this.x = this.lastBodyX;
        this.y = this.lastBodyY;
    }


    if(dist(curLeg,target) > curLeg.len) {
        // move towards mouse
        this.x += Math.cos(angle) * dist(curLeg,target)/50;
        
        this.y += Math.sin(angle) * dist(curLeg,target)/50;
        this.updateHips();
    }

    // if leg is right update it accordingly
    if(this.legSelected === "R") {
        // set angle to the locked foot to the locked hip
        oppLeg = this.getLockedLeg();
        angle = pointTo({x:oppLeg.x2,y:oppLeg.y2},this.hipRight);

        // snap body to a position where the hip is attached to the leg
        this.x = (oppLeg.x2 + oppLeg.len * Math.cos(angle)) - 5;
        this.y = (oppLeg.y2 + oppLeg.len * Math.sin(angle)) - 10;

        this.updateHips();
        
        // make sure each leg ends at the hips
        oppLeg.x = this.hipRight.x;
        oppLeg.y = this.hipRight.y;

        curLeg.x = this.hipLeft.x;
        curLeg.y = this.hipLeft.y;
    } else {
         // set angle to the locked foot to the locked hip
        oppLeg = this.getLockedLeg();
        angle = pointTo({x:oppLeg.x2,y:oppLeg.y2},this.hipLeft);

        // snap body to a position where the hip is attached to the leg
        this.x = (oppLeg.x2 + oppLeg.len * Math.cos(angle)) + 5;
        this.y = (oppLeg.y2 + oppLeg.len * Math.sin(angle)) - 10;

        this.updateHips();

        // make sure each leg ends at the hips
        oppLeg.x = this.hipLeft.x;
        oppLeg.y = this.hipLeft.y;

        curLeg.x = this.hipRight.x;
        curLeg.y = this.hipRight.y;
    }

    



    this.lastBodyX = this.x;
    this.lastBodyY = this.y;
}

Player.prototype.updateHips = function() {
    this.hipLeft = {x:this.x-5,y:this.y+10};
    this.hipRight = {x:this.x+5,y:this.y+10};
}


Player.prototype.draw = function() {
    rect(this.x, this.y, this.w, this.h,"green");
    this.leftLeg.draw();
    this.rightLeg.draw();
}

Player.prototype.update = function() {
    this.moveLeg();
    var curLeg = this.getActiveLeg();
    if(mousePress[0] || this.collided){//collidingWithWorld({x:curLeg.x2,y:curLeg.y2,w:4,h:4})||
        if(this.legSelected === "R"){
            this.legSelected = "L";
            this.lastFootX = this.leftLeg.x2;
            this.lastFootX = this.leftLeg.y2;
        } else {
            this.legSelected = "R";
            this.lastFootX = this.rightLeg.x2;
            this.lastFootX = this.rightLeg.x2;

        }

        this.collided = false;
        
    }
}



var player = new Player(400,200);