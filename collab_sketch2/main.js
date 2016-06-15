var config = {
  apiKey: "AIxaSyGsAkHke9lXEU_97a8rYpMn7gOH3eWDxrM",
  authDomain: "collab-draw.firebaseapp.com",
  databaseURL: "https://collab-draw.firebaseio.com",
  storageBucket: "",
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref();

var points = [];

function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY});
}

function setup() {
  var canvas = createCanvas(400, 400);
  background(255);
  fill(0);
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  
  canvas.mousePressed(drawPoint);
  canvas.mouseMoved(drawPoint);
  
  
  
}

function draw() {
    background(255);
    
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        ellipse(point.x, point.y, 5, 5);
  }
    
}