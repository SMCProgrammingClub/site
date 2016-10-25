var centerPlanet;
var planetArray;
var indicator;

// CONSTANTS
var G = 6.67384e-2;
var MIN_SIZE = 5;
var MAX_SIZE = 100;
var GROWTH_RATE = 1.2;

var colorPalette = ['blue', 'blue', 'blue', 'blue'];

// function proj(v1, v2) {
//   var dot = p.Vector.dot(v1, v2);
//   var comp = dot / v2.magSq();
//   return p.Vector.mult(v2, comp);
// }

function Indicator(x, y) {
  this.location = createVector(x, y);
  this.radius = MIN_SIZE;
  this.growthRate = GROWTH_RATE;
  this.randomColor = colorPalette[floor(random(colorPalette.length))];
  
  this.render = function() {
    stroke(this.randomColor);
    fill(this.randomColor);
    // Draw a line showing the initial force of the Planet
    line(mouseX, mouseY, this.location.x, this.location.y);
    
    // Draw a circle that will change sizes between MAX_SIZE and MIN_SIZE
    ellipse(this.location.x, this.location.y, this.radius*2);
    this.radius += this.growthRate;
    if (this.radius < MIN_SIZE || this.radius > MAX_SIZE) {
      this.growthRate *= -1;
    }
  };
  
  this.release = function() {
    // Make a new Planet at this location
    var planet = new Planet(this.location.x, this.location.y, this.radius, this.randomColor);
    planetArray.push(planet);
    
    // Find the distance between this location and the mouse
    // Use that as the Planet's initial force
    var force = createVector(this.location.x - mouseX, this.location.y - mouseY);
    force.mult(10);
    planet.applyForce(force);
  };
}

function Planet(x, y, radius, color) {
  this.location     = createVector(x, y);
  this.velocity     = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.radius       = radius;
  this.color        = color;
  
  this.mass = function() {
    // Area = PI * r^2
    return PI * pow(this.radius, 2);
  };
  
  this.applyForce = function(force) {
    // Newton's Second Law F=m*a
    var a = force.div(this.mass());
    this.acceleration.add(a);
  };
  
  this.attract = function(otherPlanet) {
    var vectorBetween = p5.Vector.sub(this.location, otherPlanet.location);
    var r  = vectorBetween.mag();
    var m1 = this.mass();
    var m2 = otherPlanet.mass();
    
    if (r > this.radius + otherPlanet.radius) {
      var force       = (G * m1 * m2) / pow(r, 2);
      var direction   = vectorBetween.normalize();
      var forceVector = p5.Vector.mult(direction, force);
      otherPlanet.applyForce(forceVector);
    }
  };
  
  this.render = function() {
    stroke(this.color);
    fill(this.color);
    ellipse(this.location.x, this.location.y, this.radius*2);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  planetArray = [];
  centerPlanet = new Planet(windowWidth / 2, windowHeight / 2, 150, '#cccccc');
};

function draw() {
  background(255, 255, 255, 50);
  centerPlanet.render();
  for (var i = 0; i < planetArray.length; i++) {
    centerPlanet.attract(planetArray[i]);
    planetArray[i].render();
    for (var j = 0; j < planetArray.length; j++) {
      if (i !== j) {
        planetArray[i].attract(planetArray[j]);
      }
    }
  }
  if (indicator) {
    indicator.render();
  }
};

function mousePressed() {
  indicator = new Indicator(mouseX, mouseY);
}

function mouseReleased() {
  if (indicator) {
    indicator.release();
    indicator = null;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerPlanet.location.set(windowWidth / 2, windowHeight / 2);
}
