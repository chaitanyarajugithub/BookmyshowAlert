const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const notifier = require('node-notifier');
const path = require('path');
const player = require('node-wav-player');

puppeteer.use(StealthPlugin());

async function playSoundForDuration(filePath, durationMinutes) {
  const endTime = Date.now() + durationMinutes * 60000;
  const audioDuration = 30000; // Replace with actual audio duration in milliseconds

  while (Date.now() < endTime) {
    try {
      await player.play({ path: filePath });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
    // Wait for the duration of the audio file before replaying
    await new Promise(resolve => setTimeout(resolve, audioDuration));
  }
}

async function checkBookNow() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set a custom user-agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  let isBookNowPresent = false;

  while (!isBookNowPresent) {
    try {
      await page.goto('https://in.bookmyshow.com/hyderabad/movies/kalki-2898-ad/ET00352941', { waitUntil: 'networkidle2' });

      // Check if "Book Now" text is present
      isBookNowPresent = await page.evaluate(() => {
        return document.body.innerText.includes('Book tickets');
      });

      if (isBookNowPresent) {
        console.log('Booking Opened :', isBookNowPresent);
        // Send a desktop notification
        notifier.notify({
          title: '🎬 Book Now Alert!',
          message: '🎟️ Booking Opened for the Movie! Hurry up and book your tickets!',
          icon: path.join(__dirname, 'kalki.jpeg'), // Path to a custom icon
          sound: true, // Play system notification sound
          wait: true, // Wait with callback until user action is taken on notification
          timeout: 60, // Auto close notification after 60 seconds
          reply: false, // Option to add a reply field
        });

        // Play custom sound for 10 minutes
        const soundPath = path.join(__dirname, 'bujji_theme_music.wav');
        await playSoundForDuration(soundPath, 10);

        // Break the loop if text is found
        break;
      } else {
        console.log('Booking not opened, retrying...');
      }
    } catch (error) {
      console.error('Error accessing the page:', error);
    }

    // Wait for a while before retrying
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 60 seconds
  }

  await browser.close();
}

checkBookNow();
