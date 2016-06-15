var slider;
var mouseWasPressed;
var point1;
var point2;

 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCol-DAT7l2ukTQyLuZUfzATzgsRvbznmU",
    authDomain: "collab-sketchpad.firebaseapp.com",
    databaseURL: "https://collab-sketchpad.firebaseio.com",
    storageBucket: "collab-sketchpad.appspot.com",
};
  firebase.initializeApp(config);
 
// pointsData variable(database)
  var linePointsData = firebase.database().ref();
  console.log(linePointsData);

// stores points drawn to canvas
  var pointsPairs = [];
  console.log(pointsPairs);

function setup() {
    var canvas = createCanvas(1000,1000);
    background(255);
    fill(0);
    strokeWeight(0);
    
    slider = createSlider(1, 50, 10);

    linePointsData.on("child_added", function (addPointTopointsPairsArray) {
        pointsPairs.push(addPointTopointsPairsArray.val());
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
  background(255, 204, 0);
  
  var colorPicker = document.getElementById("ColorPicker");
  
  // draw lines at points on canvas
  
  function drawIfTouchPressed() {
  // if (touchIsDown && touches.length == 1) {
  //     $('body').bind('touchmove', function(e){e.preventDefault()})
  //     drawTouch();
  //   }
  
    if(touchIsDown) {
      stroke(slider.value());
      stroke(
        colorPicker.color.rgb[0]*255, 
        colorPicker.color.rgb[1]*255, 
        colorPicker.color.rgb[2]*255
              );
      strokeCap(ROUND);
      console.log("error");
      linePointsData.push([ptouchX, ptouchY, touchX, touchY]);
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    
    return false;
  }

  function drawIfMousePressed() {
     if(mouseIsPressed == true && mouseWasPressed == false) {
        stroke(slider.value());
        stroke(
          colorPicker.color.rgb[0]*255, 
          colorPicker.color.rgb[1]*255, 
          colorPicker.color.rgb[2]*255
                );
        strokeCap(ROUND);
        point1 = [mouseX, mouseY];
        console.log("firstpoint");
      } else if(mouseIsPressed == false && mouseWasPressed == true) {
        point2 = [mouseX, mouseY];
        var pair = point1.concat(point2);
        linePointsData.push(pair);
        console.log("pushing");
      } else {
        cursor(CROSS);
      }
      
  }
    
  drawIfMousePressed();
  drawIfTouchPressed();
  
  for (var i = 0; i < pointsPairs.length; i++) {
    var point = pointsPairs[i];
    console.log(point[0], point[1], point[2], point[3]);
    line(point[0], point[1], point[2], point[3]);
    line(0, 50, 200, 50);
    // stroke(20);
    // stroke(
    //   colorPicker.color.rgb[0]*255, 
    //   colorPicker.color.rgb[1]*255, 
    //   colorPicker.color.rgb[2]*255
    //         );
    // strokeCap(ROUND);
  }

mouseWasPressed = mouseIsPressed;

console.log("drawing");

}


function drawPoint() {
  linePointsData.push({x: mouseX, y: mouseY});
}

function drawTouch() {
  linePointsData.push({x: touchX, y: touchY});
}

function saveDrawing() {
  saveCanvas("cscanvas", "png");
  console.log("saving drawing");
}

function clearDrawing() {
  linePointsData.remove();
  clear();
  pointsPairs = [];
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