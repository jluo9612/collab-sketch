var slider;

 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCol-DAT7l2ukTQyLuZUfzATzgsRvbznmU",
    authDomain: "collab-sketchpad.firebaseapp.com",
    databaseURL: "https://collab-sketchpad.firebaseio.com",
    storageBucket: "collab-sketchpad.appspot.com",
};
  firebase.initializeApp(config);
 
// pointsData variable(database)
  var lineData = firebase.database().ref();

// stores points drawn to canvas
  var lines = [];

function setup() {

    var canvas = createCanvas(1000,1000);
    background(255);
    fill(0);
    strokeWeight(0);
    
    slider = createSlider(1, 50, 10);
    
// gets data from Firebase and stores it into points variable in app.
/* The point function created as an argument does not have a name, and is not stored anywhere. 
It exists only to be passed as an argument to .on(). 
This is called an anonymous function.
It would be equivalent if we had declared a function, perhaps named addPointToPointsArray, and then passed that in as our argument to .on(). */
    lineData.on("child_added", function (addPointToLinesArray) {
     lines.push(addPointToLinesArray.val());
    });
    
    // function touchStarted() {
    //   drawIfTouchPressed();
    // }
    
    // function touchMoved() {
    //   drawIfTouchPressed(); 
    // }
    
    // function mousePressed() {
    //   drawIfMousePressed();
    // }
    
    // function mouseMoved() {
    //   drawIfMousePressed();
    // }
    
    // canvas.touchStarted(drawIfTouchPressed);
    // canvas.touchMoved(drawIfTouchPressed);
    // canvas.mousePressed(drawIfMousePressed);
    // canvas.mouseMoved(drawIfMousePressed);
    
}

// looping through the points variable which stores 
function draw() {
  background(255);
  
  var colorPicker = document.getElementById("ColorPicker");
  
  // draw lines at points on canvas
  // for (var i = 0; i < lines.length; i++) {
  //   var point = lines[i];
  //   ellipse(point.x, point.y, 5, 5);
  //   console.log("drawing");
  // }
  
  function drawIfTouchPressed() {
  // if (touchIsDown && touches.length == 1) {
  //     $('body').bind('touchmove', function(e){e.preventDefault()})
  //     drawTouch();
  //   }
    if(touchIsDown && touches.length == 1) {
      stroke(slider.value());
      stroke(
        colorPicker.color.rgb[0]*255, 
        colorPicker.color.rgb[1]*255, 
        colorPicker.color.rgb[2]*255
              );
      strokeCap(ROUND);
      lineData.push(line(ptouchX, ptouchY, touchX, touchY));
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  function drawIfMousePressed() {
     if(mouseIsPressed) {
        stroke(slider.value());
        stroke(
          colorPicker.color.rgb[0]*255, 
          colorPicker.color.rgb[1]*255, 
          colorPicker.color.rgb[2]*255
                );
        strokeCap(ROUND);
        lineData.push(line(pmouseX, pmouseY, mouseX, mouseY));
      } else {
        cursor(CROSS);
      }
  }
    
  drawIfMousePressed();
  drawIfTouchPressed();

}

// stores points drawing state to firebase
// function drawPoint() {
//   pointsData.push({x: mouseX, y: mouseY});
// }

// function drawTouch() {
//   pointsData.push({x: touchX, y: touchY});
// }

function saveDrawing() {
  saveCanvas("cscanvas", "png");
  console.log("saving drawing");
}

function clearDrawing() {
  lineData.remove();
  clear();
  lines = [];
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