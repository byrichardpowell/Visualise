

circles = function(count, size) {

	// The circles being rendered
	var items = [];

	// The size of the smallest circle
	size = ( ( ( view.viewSize.height * size ) / 2 ) / count );

	// Draw each item
	for (var i = count; i>=0; i--) {

		var thisSize = size * i;

		items[i] = new Path.Rectangle( view.center - (thisSize), (size * i) * 2 );
		items[i].fillColor = new RgbColor( ( 1 / count ) * i, Math.random() * i, Math.random() * i, 1 / (count * 0.75)); 

	}

	return items;

}


rings = circles(52, 0.8); 
SoundDataStep = Math.floor( 1024 / rings.length ); 



function onFrame(event) {

	var SoundData = MySound.getRawData();

    // Each frame, change the fill color of the path slightly by
    // adding 1 to its hue:
    $.each( rings, function(i, ring) {

    	var thisData = SoundData[SoundDataStep * i] / 1024;

    	ring.rotate( thisData * 180 );
    	ring.fillColor.hue += (thisData * 10);

    })

}


