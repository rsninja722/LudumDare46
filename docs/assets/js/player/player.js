class Player {

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.hipL = {x:x-5,y:y};
        this.hipR = {x:x+5,y:y};
        this.footL = {x:x-5,y:y+10};
        this.footR = {x:x+5,y:y+10};
        this.kneeL= {x:x-5,y:y+5};
        this.kneeR = {x:x+5,y:y+5};
        this.legSelected = "l";
        this.shouldMoveLeg = false;
    }

    getLeg(){
        if(this.legSelected === "l"){
            return [this.footL, this.kneeL, this.thighL];
        }
        return [this.footR, this.kneeR, this.thighR];

    }

}



// leg has been selected, move leg towards mouse
Player.prototype.moveLeg = function(){

    
    if(!this.shouldMoveLeg){
        return
    }
    
    var target = mousePosition();

    //TODO set a proper constant
    if(Math.hypot(this.x - target.x, this.y - target.y) < constants.legs.size.maximumMovement){

        // Points to move towards
        var ix = target.x; 
        var iy = target.y;
        var leg = this.getLeg()

        // Check collision psuedo code need to figure out actual collison
        if(ix.collide()){
            ix = leg[0].x;
        }

        // Check collision psuedo code need to figure out actual collison
        if(iy.collide()){
            iy = leg[0].y;
        }


        // total distances as a square 
        var targetSqrDistance = ix * ix + iy * iy;

        // gets lengths may need to be tweaked
        var thighKneeLength = abs(Math.hypot(leg[2].x - leg[1].x, leg[2].y - leg[1].y) * 2)
        var kneeFootLength  = abs(Math.hypot(leg[1].x - leg[0].x, leg[1].y - leg[0].y) * 2)


        var thighKneeAngle = Math.max(-1, Math.min(1, (targetSqrDistance + thighKneeLength - kneeFootLength)
                             / (2 * (thighKneeLength / 2) * Math.sqrt(targetSqrDistance)
                        )));




    }




    /*

    if target within range of leg
        ik towards target in x
            if colliding undo move
        ik towards target in y
            if colliding undo move
    if out of target
        ik towards target in x
            if colliding undo move
        ik towards target in y
            if colliding undo move
        slowly move torso towards mouse 
    planted leg ik towards torso
    if torso outside the planted leg range
        move torso back
    */


    // Finds the distance between the old hip position and the future one
    requiredLegDistance = Math.hypot(currentHip.x - futureFoot.x, currentHip.y - futureFoot.y);

    newFootX = futureFoot.x;
    newFootY =  futureFoot.y;



    // TODO implement collision checking

    

    newHipX = currentHip.x + futureFoot.x - currentFoot.x;
    newHipY = currentHip.y + futureFoot.y - currentFoot.y;

    // newKneeX = 




    // returns new leg positions
    return [{x:newHipX, y:newHipY}, {x:newKneeX, y:newKneeY}, {x:newFootX, y:newFootY}];




}




Player.prototype.draw = function() {

}

Player.prototype.update = function() {
    
}