const SFX_PATH_BASE = 'assets/sfx';
const SFX = {
	allo: 3,
	correc: 7,
	csharp: 1,
	donc: 9,
	euh: 16,
	hein: 2,
	ok: 5,
	pistolet: 10,
	regardez: 4
};

/**
 * Returns a random number between two bounds
 * @param {*} min 
 * @param {*} max 
 */
function getRandomNumber (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random sample path for the given SFX
 * @param {*} name 
 */
function getSFXPath (name) {
	if (!(name in SFX)) throw new Error(`Unknown SFX: ${name}`);
	return SFX_PATH_BASE + '/' + name + '/' + getRandomNumber(1, SFX[name]) + '.wav';
}

const audio = new Audio();
const main = document.querySelector('main');

// Register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', async _ => {
		try {
			const registration = await navigator.serviceWorker.register('/sw.js')
			console.log(registration);
		} catch (err) {
			console.log(err.message);
		}
	})
}

// Create buttons
for (const sfx in SFX) {
	const button = document.createElement('button');
	button.innerText = `${sfx} (${SFX[sfx]})`;
	button.addEventListener('click', _ => {
		audio.src = getSFXPath(sfx);
		console.log(audio.src);
		audio.play();
	});
	main.appendChild(button);
}
