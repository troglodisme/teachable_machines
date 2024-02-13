// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/0PSY3bxzX/';
let HVACImg;
let personImg;
let glassImg
let c = 0; //declare variable to control colur. Set to black to begin with

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);
  image(video, 0, 0, width, 480);

  // STEP 4: Change colour + current label if confidence is over a set value
  if (label == "HVAC" && confidence > 0.8) {
    c = color(0, 0, 255) //blue
    text("HVAC", 100, 100)

  } else if (label == "Person" && confidence > 0.8) {
    c = color(255, 0, 0) // red
    text("Person", 50, 100)
    
  }  else if (label == "Glass" && confidence > 0.8) {
    c = color(255, 0, 0) // red
    text("glass", 100, 100)

  } 
  else if (label == "nothing") {
    //don't display any image
    c = color(255, 255, 255, 0) //transparent
    text("nothing", 100, 100)

  }
  //circle in center of canvas that updates in colour depndent on classification label
  noStroke()
  fill(c)
  ellipse(width / 2, height / 2, 100, 100) //consider creating variables for x and y and moving the circle to different positions dependent on classification label


  //display labels
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);
}

// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
}
