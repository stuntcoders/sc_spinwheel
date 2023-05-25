$(document).ready(function() {
	const animateButton = $('.next-section');
	const sections = $('.section');

	animateButton.on('click', function() {
		let activeSection = sections.filter('.active');
		let nextSection = activeSection.next();

		activeSection.addClass('fade-out');

		setTimeout(function() {
			activeSection.removeClass('active fade-out');
			nextSection.addClass('active slide-up');
		}, 500);
	});
});

// Create winwheel as per normal.
let theWheel = new Winwheel({
	'numSegments'  : 8,     // Specify number of segments.
	'textFontSize' : 28,    // Set font size as desired.
	'responsive'   : true,  // This wheel is responsive!
	'segments'     :        // Define segments including colour and text.
	[
		{'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
		{'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
		{'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
		{'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
		{'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
		{'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
		{'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
		{'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
	],
	'pins' :
	{
		'outerRadius': 6,
		'responsive' : true, // This must be set to true if pin size is to be responsive, if not just location is.
	},
	'animation' :           // Specify the animation to use.
	{
		'type'     : 'spinToStop',
		'duration' : 5,     // Duration in seconds.
		'spins'    : 8,     // Number of complete spins.
		'callbackFinished' : alertPrize,
	}
});

// -----------------------------------------------------------------
// Called by the onClick of the canvas, starts the spinning.
function startSpin() {
	// Stop any current animation.
	theWheel.stopAnimation(false);

	// Reset the rotation angle to less than or equal to 360 so spinning again
	// works as expected. Setting to modulus (%) 360 keeps the current position.
	theWheel.rotationAngle = theWheel.rotationAngle % 360;

	// Start animation.
	theWheel.startAnimation();
}

function alertPrize(indicatedSegment) {
	// Do basic alert of the segment text. You would probably want to do something more interesting with this information.
	alert("You have won " + indicatedSegment.text);
}
