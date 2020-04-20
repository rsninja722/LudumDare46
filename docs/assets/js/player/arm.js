// a Class for legs
class Arm {

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

Arm.prototype.draw = function () {
    img(sprites.playerArm,(this.x+this.x2)/2,(this.y+this.y2)/2,this.angle-pi/2,4,4);
};
