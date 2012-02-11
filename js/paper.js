

circles = function(count) {

	// The circles being rendered
	var circles = []
	

	// Draw each circle
	for (var i = count; i>=0; i--) {

		console.log(i);
		
		circles[i] = new Path.Circle( view.center, 10 * i );
		circles[i].fillColor = new RgbColor(0.1 * i, 0.35, 0.7, 0.1 * i); 

	}

	return circles;

}


var discs = circles(10); 




function onFrame(event) {


    // Each frame, change the fill color of the path slightly by
    // adding 1 to its hue:
    $.each( discs, function(i, disc) {
    	
    	disc.fillColor.hue += 1;

    })

}


