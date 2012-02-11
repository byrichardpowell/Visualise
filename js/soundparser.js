var SoundParser = function (file, container) {

	var self = this;
	
	// Build audio reference
	self.file = file;
	self.container = document.body;
	self.audio = new Audio();
	self.audio.src = self.file;
	self.audio.controls = true;
	self.audio.autoplay = true;
	self.audio.loop = true;
	self.container.appendChild(self.audio);
	
	// Build audiocontext
	self.context = new webkitAudioContext();
	self.analyser = self.context.createAnalyser();
	self.source = self.context.createMediaElementSource(self.audio);
  	self.source.connect(self.analyser);
  	self.analyser.connect(self.context.destination);
	
	// Access sound data
	self.getVolume = function () {
		return 0;
	}
	self.getRawData = function () {
		var d = [];
		var freqByteData = new Uint8Array(self.analyser.frequencyBinCount);
		self.analyser.getByteFrequencyData(freqByteData);
		d = freqByteData;
		return freqByteData;
	}
	
	// Stop/Start
	self.start = function () {
		self.audio.play();
	}
	self.stop = function () {
		self.audio.pause();
	}
	
	console.log('self:', self);
	
	return self;

}