

circles = function(count, size) {

	// The circles being rendered
	var items = [];

	// The size of the smallest circle
	size = ( ( ( view.viewSize.height * size ) / 2 ) / count );

	// Draw each item
	for (var i = count; i>=0; i--) {

		var thisSize = size * i;

		items[i] = new Path.Rectangle( view.center - (thisSize / 2), size * i );
		items[i].fillColor = new RgbColor( ( 1 / count ) * i, 0.35, 0.7, 1 / (count * 0.75)); 

	}

	return items;

}


rings = circles(15, 0.95); 
SoundDataStep = Math.floor( 1024 / rings.length ); 
console.log( SoundDataStep );


function onFrame(event) {

	var SoundData = MySound.getRawData();

    // Each frame, change the fill color of the path slightly by
    // adding 1 to its hue:
    $.each( rings, function(i, ring) {

    	var rotation = (SoundData[SoundDataStep * i] / 1024) * 180; 

    	console.log(rotation);

    	ring.rotate( rotation );
    	ring.fillColor.hue += 1;

    })

}


