const player = require('node-wav-player');
const path = require('path');

const soundPath = path.join(__dirname, 'bujji_theme_music.wav');

// Play the sound file
player.play({
  path: soundPath,
}).then(() => {
  console.log('The wav file started to be played successfully.');
}).catch((error) => {
  console.error('Error playing sound:', error);
});
