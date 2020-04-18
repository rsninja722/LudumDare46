

// a Class for legs
class Leg{


    Leg(thighX, thighY, kneeX, kneeY, footX, footY){

        // Thigh X,Y
        this.thighX = thighX;
        this.thighY = thighY;

        // Knee X,Y
        this.kneeX = kneeX;
        this.kneeY = kneeY;

        // Foot X,Y
        this.footX = footX;
        this.footY = footY

        // Calculates distances
        this.thighToKnee = abs(math.hypot(thighX - kneeX, thighY - kneeY));
        this.kneeToFoot = abs(math.hypot(kneeX - footX, kneeY - footX));

    }

    setThigh(newX, newY){
        this.thighX = newX;
        this.thighY = newY;

        // Recalculates distances
        this.thighToKnee = abs(math.hypot(newX - this.kneeX, newY - this.kneeY));
    }

    setKnee(newX, newY){
        this.kneeX = newX;
        this.kneeY = newY;

        // Recalculates distances
        this.thighToKnee = abs(math.hypot(this.thighX - newX, this.thighY - newY));
        this.kneeToFoot = abs(math.hypot(newX - this.footX, newY - this.footY));
    }

    setFoot(newX, newY){
        this.footX = newX;
        this.footY = newY;

        // Recalculates distances
        this.kneeToFoot = abs(math.hypot(this.kneeX - newX, this.kneeY - newY));
    }



};


