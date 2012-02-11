// Create a circle shaped path at the center of the view,
// with a radius of 70:
var path = new Path.Circle(view.center, 70);

// Fill the path with red:
path.fillColor = 'red';


function onFrame(event) {

    // Each frame, change the fill color of the path slightly by
    // adding 1 to its hue:
    path.fillColor.hue += 1;
    
    ;

}