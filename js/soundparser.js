var SoundParser = function (file, container) {

	var self = this;
	
	//
	//	Access sound data
	//
	self.getAverageVolume = function () {
		return 0;
	}
	self.getFrequencyData = function () {
		var freqByteData = new Uint8Array(self.analyser.frequencyBinCount);
		self.analyser.getByteFrequencyData(freqByteData);
		return freqByteData;
	}
	self.getAverageFrequency = function (bits) {
		if (!bits) bits = 8;
		var d = self.getFrequencyData();
		var n = 1024 / bits;
		var t = 0;
		for (var i = 0; i < 1024; i += bits) {
			t += d[i];
		}
		return t;
	}
	
	//
	//	Animation Helper
	//
	self.animate = function (params) {
		
		var animation = self.getAnimation(params.name);
		
		if (animation) {
			var animateObject = new SoundParserAnimateObject(params);
			setInterval(animation, 1000 / animateObject.fps, animateObject);
		}
		
	}
	self.getAnimation = function (name) {
		
		console.error('Animation not found');
		return false;
		
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
	
	return self;

}


//
//	Custom Animations
//
SoundParserAnimateObject = function (a) {
	
	 var self = function () {}
	 
	 self.fps = a.fps ? a.fps : 30;
	 self.name = a.name ? a.name : 'default';
	 self.canvas = a.canvas;
	 
	 return self;
	
}
SoundParser.prototype.animations.flyingBird = function (ani) {
	
	
	
}