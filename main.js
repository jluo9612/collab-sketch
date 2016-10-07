/*global firebase*/
/*global createCanvas*/
/*global background*/
/*global fill*/
/*global pointsData*/
/*global ellipse*/
/*global mouseX*/
/*global mouseY*/
/*global canvas*/
/*global mouseIsPressed*/

var mouseWasPressed;

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCol-DAT7l2ukTQyLuZUfzATzgsRvbznmU",
    authDomain: "collab-sketchpad.firebaseapp.com",
    databaseURL: "https://collab-sketchpad.firebaseio.com",
    storageBucket: "collab-sketchpad.appspot.com",
  };
  firebase.initializeApp(config);
 
// pointsData variable(database)
  var pointsData = firebase.database().ref();

// stores points drawn to canvas; this variable is stored in firebase?
  var points = [];

function setup() {
    var canvas = createCanvas(1000,1000);
    canvas.parent('drawingContainer');
    
    background(255);
    fill(0);
    strokeWeight(1);
    
    slider = createSlider();
    slider.parent("slider");
    
// gets data from Firebase and appends it into points variable
    pointsData.on("child_added", function (addPointToPointsArray) {
     points.push(addPointToPointsArray.val());
    });
    
    function drawPointIfMousePressed() {
     if (mouseIsPressed) {
       drawPoint();
     }
    }
    
    function drawPointIfTouchPressed() {
     if (touchIsDown) {
        drawTouch();
      }
    }
    canvas.touchStarted(drawPointIfTouchPressed);
    canvas.touchMoved(drawPointIfTouchPressed);
    canvas.mousePressed(drawPointIfMousePressed);
    canvas.mouseMoved(drawPointIfMousePressed);
    
}

/* The point function created as an argument does not have a name, and is not stored anywhere. 
It exists only to be passed as an argument to .on(). 
This is called an anonymous function.
It would be equivalent if we had declared a function, perhaps named addPointToPointsArray, and then passed that in as our argument to .on(). */

// looping through the points variable which stores 
function draw() {
  background(255);
  
  // draw lines at points on canvas
  if(mouseWasPressed == false && mouseIsPressed == true) {
      // var point = slider.value();
      pointsData.push({empty: "empty"});
  }
 
  for (var i = 0; i < points.length; i++) {
    if(i > 0 && points[i] != {empty: "empty"} && points[i-1] != {empty: "empty"}) {
      var point = points[i];
      var previous = points[i-1];
      strokeWeight(point.width);
      line(previous.x, previous.y, point.x, point.y);
    }
  }
  
mouseWasPressed = mouseIsPressed;
  
}

function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY, width: slider.value()});
}

function drawTouch() {
  pointsData.push({x: touchX, y: touchY});
}

function saveDrawing() {
  saveCanvas("cscanvas", "png");
  console.log("saving drawing");
}

function clearDrawing() {
  pointsData.remove();
  points = [];
  console.log("clearing drawing");
}

function expandCanvas() {
  resizeCanvas(2000, 2000);
  console.log("expand canvas to 2000x2000");
}

function sure() {
  if(confirm("Are you sure that you want to delete this drawing?") == true) {
    clearDrawing();
  }
  else{
    alert("Thank you!");
  }
}

$("#saveDrawing").on("click", saveDrawing);

$("#clearDrawing").on("click", sure);

$("#expandCanvas").on("click", expandCanvas);