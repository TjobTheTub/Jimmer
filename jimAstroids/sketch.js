let ship
let asteroids = [];
let lasers = [];
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 15; i++) {
    asteroids.push(new Asteroid());
  }
}
function draw() {
  background(0);

  fill(0, 102, 153);
  textSize(32);
  text('Dine totalt seje Asteroid kills:' + score, 10, 30);


  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('Oooopsie!')
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].offscreen()) {
          lasers.splice(i, 1);
        } else {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 10) {

              let newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);

              score++;
            }
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            break;
          }
        }
      }
    }


  }
  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}


function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false)
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }

}