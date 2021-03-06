let ship;
let asteroids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();  
  asteroids.push(new Asteroid())

}
function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  for (let i = 0; i < asteroids.length; i++){
    asteroids[i].render();
  }
}
function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);

}
function keyPressed() {
  if (keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  }else if (keyCode == UP_ARROW){
    ship.boosting(true);

  }
  
}

function Ship(){
  this.pos = createVector(width/2,height/2);
  this.r = 50;
  this.heading = 30;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosting = false;

  this.boosting = function(b){
    this.isBoosting = b;
  }

  this.update = function(){
    if (this.isBoosting){
      this.boost();
      
    }
    this.pos.add(this.vel)
    this.vel.mult(0.99);

  }

  this.boost = function(){
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.3)
    this.vel.add(force);
  }

  this.render = function() {
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading + PI/2);
    noFill();
    stroke(255)
    triangle(-this.r,this.r, this.r, this.r, 0, -this.r);
    pop();

  } 
  this.edges = function() {  
    if(this.pos.x > width + this.r){
      this.pos.x = -this.r;
    }else if (this.pos.x < -this.r){
      this.pos.x = width + this.r
    }

     
      if(this.pos.y > height + this.r){
        this.pos.y = -this.r;
      }else if (this.pos.y < -this.r){
        this.pos.y = height + this.r
      }

  }
  this.setRotation = function(a)  {
    this.rotation = a;
  }
  
  this.turn = function()  {
  this.heading += this.rotation;
  }
}