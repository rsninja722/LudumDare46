// a Class for legs
class Leg{


    constructor(x, y, len, angle) {

        this.x = x;
        this.y = y;


        this.len = len;
        this.len2 = this.len * this.len;
        this.angle = angle;

        this.x2 = this.x + len * Math.cos(angle);
        this.y2 = this.y + len * Math.sin(angle);
    }


    
};

Leg.prototype.draw = function() {
    line(this.x,this.y,this.x2,this.y2,"green");
};