//my game is inspired by asteroids with a twist
// your goal is to eat the asteroids instead of shooting them
// asteroid concept has been changed to cheese wheels but original variable names remain. asteroids = cheese wheels
// spaceship is now a hungry mouse

let rez = 20;
let asteroids = [];
let score = 0;
let numAsteroids = 30;


function setup() {
  createCanvas(1000, 1000);
  
}

// reset game function that resets score and cheese wheels
    function resetGame() {
        score = 0;  
        asteroids = [];  
        for (let i = 0; i < numAsteroids; i++) {
        let x = random(width);
       let y = random(height);
       let asteroid = createVector(x, y);
       asteroid.size = random(25, 70);
       asteroid.vel_x = random(-4, 4);
       asteroid.vel_y = random(-4, 4);
       asteroids.push(asteroid);
    }
    }

  //reset game key function
function keyPressed() {
    if (key == 'r' || key == 'R') {
        resetGame();   
    }
 }


function draw() {
  background(243, 224, 231); 
 //score counter
  fill(100);
  textSize(40);
  text("Score: " + score , 40, 50);

//instructions
  fill(100);
  textSize(30);
  text("Move around using the mouse to eat the runaway cheese wheels!", 40, 950);
  text("Press R to Start/ Restart", 40, 980);

 //player / mouse
 triangle(mouseX, mouseY -40, mouseX -30, mouseY + 30, mouseX + 30, mouseY + 30);
 //mouse vertices
 push();
 let sx1 = mouseX;
 let sy1 = mouseY - 40;
 let sx2 = mouseX - 30;
 let sy2 = mouseY + 30;
 let sx3 = mouseX + 30;
 let sy3 = mouseY + 30;
 strokeWeight(4);
 stroke(50);
 fill(100);
 triangle(sx1, sy1, sx2, sy2, sx3, sy3);
 pop();


// actual cheese wheels
for (let i = 0; i < asteroids.length; i++) {
    let asteroid = asteroids[i];
push();
strokeWeight(4);
stroke(227, 159, 58);
fill(245, 195, 66);
ellipse (asteroid.x, asteroid.y, asteroid.size, asteroid.size);
 asteroid.x += asteroid.vel_x;
 asteroid.y += asteroid.vel_y;
 
 //collision detection for cheese wheels not to go off screen
 if (asteroid.x < 0 || asteroid.x > width || asteroid.y < 0 || asteroid.y > height) {
     asteroid.vel_x *= -1;
     asteroid.vel_y *= -1;
 }
pop();

//collision detection for mouse and cheese wheels (to give points)
let d1 = dist(sx1, sy1, asteroid.x, asteroid.y);
let d2 = dist(sx2, sy2, asteroid.x, asteroid.y);
let d3 = dist(sx3, sy3, asteroid.x, asteroid.y);

if (d1 < asteroid.size / 2 || d2 < asteroid.size /2 || d3 < asteroid.size /2) {
    asteroids.splice(i, 1);
    asteroidEat();
}
}

//score goes up 1 when player eats a cheese wheel
function asteroidEat() {
    score = score + 1;

}
//win condition
if (score === numAsteroids) {
    textSize(100);
    fill(100);
    text("You win!", 300, 500);
}
}