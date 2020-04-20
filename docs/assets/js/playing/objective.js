class Objective {
    constructor(x,y,w,h,imgName,callback) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgName = imgName;
        this.callback = callback;
    }
}

Objective.prototype.draw = function() {
    imgIgnoreCutoff(sprites[this.imgName],this.x,this.y,0,4,4);
}

Objective.prototype.update = function() {
    if(rectrect(this,player)) {
        this.callback();
        return true;
    }
    return false;
}

var Objectives = [];
function updateObjectives() {
    for(var i=0;i<Objectives.length;i++) {
        if(Objectives[i].update()) {
            Objectives.splice(i,1);
            i--;
        }
    }
}

function drawObjectives() {
    for(var i=0;i<Objectives.length;i++) {
        Objectives[i].draw();
    }
}

Objectives.push(new Objective(-140,108,60,300,"cereal",function(){console.log("%c cereal obtained 😎","font-size:200%;");tutState = tutorialStates.getMail;}));
Objectives.push(new Objective(-740,156,50,50,"box",function(){console.log("%c the entire mailbox obtained 😎","font-size:200%;");player.holdingBox = true;}));
