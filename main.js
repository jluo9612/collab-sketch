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

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
  saveCanvas();
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
  pointsData.remove();
  points = [];
}
