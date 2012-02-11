

circles = function(count, size) {

	// The circles being rendered
	var items = [];

	// The size of the smallest circle
	size = ( ( ( view.viewSize.height * size ) / 2 ) / count )

	// Draw each item
	for (var i = count; i>=0; i--) {
		
		items[i] = new Path.Circle( view.center, size * i );
		items[i].fillColor = new RgbColor(0.1 * i, 0.35, 0.7, 1); 

	}

	return items;

}


rings = circles(10, 0.95); 

console.log( rings[0] );

// Clear the canvas between frames
// Clear the canvas between frames
var clearView = function(opacity) {

	var point = new Point(0,0)
	var size = new Size(view.viewSize.width, view.viewSize.height);

	var blank = new Path.Rectangle(point, size)
	blank.fillColor = 'black'; 

}


oldSize = 2


function onFrame(event) {

	var newSize = Math.random() * 8
	var sizeModifier = Math.abs(newSize - oldSize);

	oldSize = newSize;

    // Each frame, change the fill color of the path slightly by
    // adding 1 to its hue:
    $.each( rings, function(i, ring) {
    
    	ring.scale( 1 );
    	ring.fillColor.hue += 1;

    })

}


