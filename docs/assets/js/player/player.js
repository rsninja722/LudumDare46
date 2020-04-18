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

    // move selected leg towards mouse
   
    // var angle = turn(pointTo(curLeg,{x:curLeg.x2,y:curLeg.y2}),pointTo(curLeg,target),0.1);
    var angle = pointTo(curLeg,target);
    curLeg.x2 = curLeg.x + curLeg.len * Math.cos(angle);
    curLeg.y2 = curLeg.y + curLeg.len * Math.sin(angle);

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
    if(collidingWithWorld({x:curLeg.x2,y:curLeg.y2,w:4,h:4})||mousePress[0]){
        if(this.legSelected === "R"){
            this.legSelected = "L";
        } else {
            this.legSelected = "R";
        }
    }
}



var player = new Player(300,200);