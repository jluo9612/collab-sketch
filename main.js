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
    
    slider = createSlider(2, 255, 0);
    slider.parent("slider");
    
// gets data from Firebase and appends it into points variable
    pointsData.on("child_added", function (point) {
     points.push(point.val());
    });
    
    // function drawPointIfMousePressed() {
    // if (mouseIsPressed) {
    //   drawPoint();
    // }
    // }
    
    // function drawPointIfTouchPressed() {
    // if (touchIsDown) {
    //     drawTouch();
    //   }
    // }
    
  //  canvas.touchStarted(drawTouch);
  //  canvas.touchMoved(drawTouch);
    canvas.mousePressed(drawPoint);
    
    canvas.mouseMoved(function () {
      if (mouseIsPressed) {
        drawPoint();
      }
    });
    
}

// looping through the points variable which stores 
function draw() {
  background(255);
  
  // // draw lines at points on canvas
  // if(mouseWasPressed == false && mouseIsPressed == true) {
  //     pointsData.push({empty: "empty"});
  // }
 
  for (var i = 0; i < points.length; i++) {
    if(i > 0 && points[i] != {empty: "empty"} && points[i-1] != {empty: "empty"}) {
      // var point = points[i];
      // var previous = points[i-1];
      // strokeWeight(point.width);
      // line(previous.x, previous.y, point.x, point.y);
      
       var point = points[i];
       ellipse(point.x, point.y, 5, 5);
    }
  }
  
  // mouseWasPressed = mouseIsPressed;
  
}

function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY, width: slider.value()});
}

function drawTouch() {
  pointsData.push({x: touchX, y: touchY, width: slider.value()});
}

function saveDrawing() {
  saveCanvas("Painter Orpheus <3", "png");
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
  if(confirm("Are you sure that you want to delete this drawing? (Please don't)") == true) {
    clearDrawing();
  }
  else{
    alert("Thank you!");
  }
}

$("#saveDrawing").on("click", saveDrawing);

$("#clearDrawing").on("click", sure);

$("#expandCanvas").on("click", expandCanvas);