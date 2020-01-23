
function Asteroid(pos) {
    if ( pos){
        this.pos = pos.copy();
    }else{
        this.pos = createVector(random(width), random(height))
    }
    
    this.vel = p5.Vector.random2D();
    this.r = random(15,50);
    this.total = floor(random(5, 15));
    this.offset = [];
    for (let i = 0; i < this.total; i++){
        this.offset[i] = random(-10,10);
    }
    this.update = function(){
        this.pos.add(this.vel);
        }


    this.render = function () {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        //ellipse(0, 0, this.r * 2);
        beginShape();
        for(let i = 0; i < this.total; i++){
            let angle= map(i, 0, this.total, 0, TWO_PI);
            let r = this.r + this.offset[i];
            let x = r*cos(angle);
            let y = r*sin(angle);
            vertex(x,y);
        }
        endShape(CLOSE);


        pop();
    }
this.breakup = function(){
let newA = [];
newA[0] = new Asteroid(this.pos);
newA[1] = new Asteroid(this.pos);
return newA;
}
    this.edges = function () {
        if (this.pos.x > width + this.r) {
          this.pos.x = -this.r
        } else if (this.pos.x < -this.r) {
          this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
          this.pos.y = -this.r
        } else if (this.pos.y < -this.r) {
          this.pos.y = height + this.r;
        }
        this.setRotation = function (a) {
          this.rotation = a;
        }
      }
}