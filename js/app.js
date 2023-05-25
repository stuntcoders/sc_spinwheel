const animateButton = document.querySelector('.next-section');
const sections = document.querySelectorAll('.section');
const actionButton = document.querySelector('.spin-the-wheel');

if (localStorage.getItem('wheelDisabled')) {
	actionButton.disabled = true;
	actionButton.setAttribute('disabled', true);
}

animateButton.addEventListener('click', function() {
	animateSections();
});

function animateSections() {
	let activeSection = document.querySelector('.section.active');
	let nextSection = activeSection.nextElementSibling;

	activeSection.classList.add('fade-out');

	setTimeout(function() {
		activeSection.classList.remove('active', 'fade-out');
		nextSection.classList.add('active', 'slide-up');
	}, 500);
}


const prizes = [
	{ rewardData: '', fillStyle: '#54265e', textFillStyle: '#ffffff', text: 'SPIN AGAIN' },
	{ rewardData: 'Reward description', fillStyle: '#ffffff', textFillStyle: '#54265e', text: 'PRIZE BOX' },
	{ rewardData: '', fillStyle: '#54265e', textFillStyle: '#ffffff', text: 'NO LUCK' },
	{ rewardData: 'Reward description', fillStyle: '#ffffff', textFillStyle: '#54265e', text: 'PRIZE BOX' },
	{ rewardData: '', fillStyle: '#54265e', textFillStyle: '#ffffff', text: 'SPIN AGAIN' },
	{ rewardData: 'Reward description', fillStyle: '#ffffff', textFillStyle: '#54265e', text: 'PRIZE BOX' },
	{ rewardData: '', fillStyle: '#54265e', textFillStyle: '#ffffff', text: 'NO LUCK' },
	{ rewardData: 'Reward description', fillStyle: '#ffffff', textFillStyle: '#54265e', text: 'PRIZE BOX' },
];

// Create winwheel as per normal.
let theWheel = new Winwheel({
	'numSegments'  : prizes.length,
	'textFontSize' : 22,
	'textFontFamily' : 'Archivo',
	'textFillStyle'  : 'white',
	'textFontWeight' : 600,
	'responsive'   : true,
	'segments': prizes.map(prize => ({
		text: prize.text,
		fillStyle: prize.fillStyle,
		textFillStyle: prize.textFillStyle,
		rewardData: prize.rewardData,
	})),
	'animation' :
	{
		'type'     : 'spinToStop',
		'duration' : 5,
		'spins'    : 8,
		'callbackFinished' : alertPrize,
	}
});

function startSpin() {
	// Stop any current animation.
	theWheel.stopAnimation(false);
	theWheel.rotationAngle = theWheel.rotationAngle % 360;

	// Start animation.
	theWheel.startAnimation();
}

function disableSpinButton() {
	actionButton.disabled = true;
	actionButton.setAttribute('disabled', true);
	localStorage.setItem('wheelDisabled', true);
}

function alertPrize(indicatedSegment) {
	const selectedPrize = indicatedSegment.text;

	if ( selectedPrize !== 'SPIN AGAIN' && selectedPrize !== 'NO LUCK' ) {
		const prizeInfoDiv = document.querySelector('.prize-info');
		prizeInfoDiv.innerHTML = `You have won ${indicatedSegment.rewardData}!`;
		animateSections();
		disableSpinButton();
	} else if ( selectedPrize === 'SPIN AGAIN' ) {
		resetWheel();
	} else if ( selectedPrize === 'NO LUCK') {
		disableSpinButton();
	}
}

function resetWheel() {
	const selectedPrize = theWheel.getIndicatedSegment();

	if (selectedPrize.text === 'Prize 2') {
		theWheel.stopAnimation(false);
		theWheel.rotationAngle = 0;
		theWheel.draw();

		wheelSpinning = false;
	}
}
