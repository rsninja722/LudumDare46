class Particle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = rand(2,8);
        var angle = rand(0,2262)/360;
        var speed = rand(5,10);
        this.vel = {x:Math.cos(angle) * speed,y:Math.sin(angle) * speed};
        this.timer = rand(25,50);
    }
}

Particle.prototype.draw = function() {
    rect(this.x,this.y,this.size,this.size,"#baba30");
}

Particle.prototype.update = function() {
    if(this.timer <= 0) {
        return true;
    }
    --this.timer;
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.y += 0.1;
    return false;
}

var Particles = [];
function updateParticles() {
    for(var i=0;i<Particles.length;i++) {
        if(Particles[i].update()) {
            Particles.splice(i,1);
            i--;
        }
    }
}

function drawParticles() {
    for(var i=0;i<Particles.length;i++) {
        Particles[i].draw();
    }
}