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
    background(255);
    fill(0);
    
// gets data from Firebase and stores it into points variable in app
    pointsData.on("child_added", function (addPointToPointsArray) {
     points.push(addPointToPointsArray.val());
    });
    function drawPointIfMousePressed() {
     if (mouseIsPressed) {
       drawPoint();
     }
    }
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
  
  // draw ellipses at points on canvas
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    ellipse(point.x, point.y, 5, 5);
  }
}

// update points drawn to firebase
function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY});
}

function saveDrawing() {
  saveCanvas();
  console.log("saving drawing");
}

function clearDrawing() {
  pointsData.remove();
  points = [];
  console.log("clearing drawing");
}

function test() {
  console.log("ALERT");
}

function expandCanvas() {
  resizeCanvas(2000, 2000);
  console.log("expand canvas to 2000x2000");
}

function sure() {
  if(confirm("Are you sure that you want to delete this drawing???") == true) {
    clearDrawing();
  }
  else{
    alert("Thank you!");
  }
}

$("#saveDrawing").on("click", saveDrawing);

$("#clearDrawing").on("click", sure);

$("#expandCanvas").on("click", expandCanvas);