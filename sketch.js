/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 *
 * This program is copied from Professor Meng's revisions for CSCI
 * 201.
 * REVISIONS MADE BY KONA GLENN:
 * 1. Updated the song to a free version of Feliz Navidad
 * downloaded from https://jesusful.com/feliz-navidad-christmas-
 * song-lyrics-and-mp3/
 * 2. Moved the rectangular textbox from the corner to the center
 * and made it a tree shape
 * 3. Changed the text to say "Happy Holidays!"
 * 4. Changed the font color, the text box color, and also altered
 * the program so the balls are all random shades of red, rather
 * than any random color -- fitting the Christmas color scheme
 * 5. Added a background image
 * 6. Removed the colliding with the box feature, as I like how 
 * the balls look moving through the tree
 *
 */

var balls = [];
var sound;
var testBall;

function preload() {

  sound = loadSound("FelizNavidad.mp3");  // preload the sound file
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)
  bg = loadImage('gold snowy background.jpg')
  
  noStroke();
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 255;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  fill(133, 105, 70);
  rect(275, 300, 50, 50);
  fill(139, 237, 135);
  triangle(300, 50, 150, 300, 450, 300);
  
  
  
  textSize(24);           // size of the text (pixels)
  fill(212, 72, 72);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Happy Holidays!', 300, 225);   
 
}

function draw() {

  background(bg);
  createBox();
  
  //testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    //balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  //testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(100, 500);
    this.green = random(0);
    this.blue  = random(0);

  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

//    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}