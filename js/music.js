// Create an <audio> element dynamically.
var audio = new Audio();
audio.src = 'music.ogg';
audio.controls = true;
document.body.appendChild(audio);

var context = new webkitAudioContext();
var analyser = context.createAnalyser();




// Wait for window.onload to fire. See crbug.com/112368
window.addEventListener('load', function(e) {
  	// Our <audio> element will be the audio source.
  	window.Audio = context.createMediaElementSource(audio);
  	window.Audio.connect(analyser);
  	analyser.connect(context.destination);

}, false);