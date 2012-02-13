var SoundParser = function (file, container) {

	var self = this;
	
	//
	//	Access sound data
	//
	self.getAverageVolume = function () {
		return 0;
	}
	self.getFrequencyData = function (float) {
		if (!float) {
			var data = new Uint8Array(self.analyser.frequencyBinCount);
			self.analyser.getByteFrequencyData(data);
		} else {
			var data = new Float32Array(self.analyser.frequencyBinCount);
			self.analyser.getFloatFrequencyData(data);
		}
		return data;
	}
	self.getRawData = function () {
		return self.getFrequencyData();
	}
	self.getAverageFrequency = function (bits) {
		if (!bits) bits = 8;
		var d = self.getFrequencyData();
		var n = 1024 / bits;
		var t = 0;
		for (var i = 0; i < 1024; i += bits) {
			t += d[i];
		}
		return t / n;
	}
	self.getFrequencyPercentages = function () {
		var a = [];
		var min = self.analyser.minDecibels;
		var offset = Math.abs(min);
		var max = self.analyser.maxDecibels;
		var diff = Math.abs(max - min);
		var scale = diff / 100;
		var d = self.getFrequencyData(true);
		for (var i = 0; i < 1024; i+= 1) {
			a.push((d[i] + offset) * scale);
		}
		return a;
	}
	
	//
	//	Animation Helper
	//
	self.animate = function (params) {
		
		var animation = self.getAnimation(params.name);
		self.log(params);
		
		if (typeof animation == 'function') {
			var animateObject = new SoundParserAnimateObject(params, self);
			setInterval(animation, 1000 / animateObject.fps, animateObject);
		}
		
	}
	self.getAnimation = function (name) {
		
		//console.error('Animation not found');
		if (SoundParser.prototype.animations.hasOwnProperty(name)) {
			console.log('[SoundParser]', 'Got Animation', name);
			return SoundParser.prototype.animations[name];
		} else {
			console.log('[SoundParser]', 'Animation Not Found', name);
			return false;
		}
		
	}
	
	// Stop/Start
	self.start = function () {
		self.audio.play();
	}
	self.stop = function () {
		self.audio.pause();
	}
	
	// Build audio reference
	self.file = file;
	self.container = document.querySelector('#' + container);
	self.audio = new Audio();
	self.audio.src = self.file;
	self.audio.controls = true;
	self.audio.autoplay = false;
	self.audio.loop = true;
	self.container.appendChild(self.audio);
	
	// Initialize context
	self.init = function () {
		self.context = new webkitAudioContext();
		self.analyser = self.context.createAnalyser();
		self.source = self.context.createMediaElementSource(self.audio);
	  	self.source.connect(self.analyser);
	  	self.analyser.connect(self.context.destination);
 
  	}
  	
  	// Logging
  	self.log = function (a, b, c) {
		console.log('[SoundParser]', a);
  	}
	
	return self;

}


//
//	Custom Animations
//
SoundParserAnimateObject = function (a, p) {
	
	var self = function () {}
	
	self.parser = p;
	 
	self.fps = a.fps ? a.fps : 30;
	self.name = a.name ? a.name : 'default';
	self.canvas = a.canvas;
	self.width = a.width ? a.width : 100;
	self.height = a.height ? a.height : 100;
	 
	self.canvas.width = self.width;
	self.canvas.height = self.height;
	
	self.context2d = self.canvas.getContext('2d');
	 
	return self;
	
}
var bits = 1;
SoundParser.prototype.animations = {};
SoundParser.prototype.animations.default = function (ani) {
	
	var cx = ani.context2d;
	cx.clearRect(0, 0, ani.canvas.width, ani.canvas.height);
	var d = ani.parser.getFrequencyPercentages();
	
	
	cx.lineWidth = bits;
	cx.strokeStyle = "#090";
	
	// Bottom
	cx.beginPath();
	for (var i = 0, l = d.length; i < l; i += bits) {
		cx.moveTo(i, ani.canvas.height - 0);
		cx.lineTo(i, ani.canvas.height - (d[i] * (ani.canvas.height / 100)));
	}
	cx.stroke();
	
	// Top
	cx.beginPath();
	for (var i = d.length; i > 0; i -= bits) {
		cx.moveTo(d.length - i, 0);
		cx.lineTo(d.length - i, (d[i] * (ani.canvas.height / 100)));
		
	}
	
	cx.stroke();
	
}

// Flying Bird
SoundParser.prototype.animations.scale = function (ani) {
	
	var cx = ani.context2d;
	cx.clearRect(0, 0, ani.canvas.width, ani.canvas.height);
	
	var avg = ani.parser.getAverageFrequency();
	
	if (avg) {
		var scale = avg;
		cx.fillRect((ani.canvas.width / 2) - (avg / 2), (ani.canvas.height / 2) - (avg / 2), avg, avg);
		cx.stroke();
	}
	
}