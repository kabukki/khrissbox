const SFX_PATH_BASE = 'assets/sfx';
const SFX = {
	allo: {
		text: 'Allo',
		samples: 3
	},
	correc: {
		text: 'C\'est correc',
		samples: 7
	},
	csharp: {
		text: 'C#',
		samples: 1
	},
	donc: {
		text: 'Donc',
		samples: 9
	},
	euh: {
		text: 'Euuuh',
		samples: 16
	},
	hein: {
		text: 'Hein ?',
		samples: 2
	},
	ok: {
		text: 'OK',
		samples: 5
	},
	pistolet: {
		text: 'Pistolet',
		samples: 10
	},
	regardez: {
		text: 'Regardez !',
		samples: 4
	}
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
	return SFX_PATH_BASE + '/' + name + '/' + getRandomNumber(1, SFX[name].samples) + '.wav';
}

const audio = new Audio();
const main = document.querySelector('main');

// Register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', async _ => {
		try {
			const registration = await navigator.serviceWorker.register('/khrissbox/sw.js', {
				scope: '/khrissbox/'
			})
			console.log(registration);
		} catch (err) {
			console.log(err.message);
		}
	})
}

// Create buttons
for (const [name, sfx] of Object.entries(SFX)) {
	const button = document.createElement('button');
	button.innerText = `${sfx.text} (${sfx.samples})`;
	button.addEventListener('click', _ => {
		audio.src = getSFXPath(name);
		console.log(audio.src);
		audio.play();
	});
	main.appendChild(button);
}
