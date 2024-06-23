# Movie Booking Alert System

This project provides an enhanced desktop notification system to alert users when movie bookings open. It uses the `node-notifier` package to create interactive notifications with custom icons, sounds, and actions.

## Features

- **Custom Icon**: Display a custom icon in the notification.
- **Sound**: Play a system notification sound.
- **Custom Actions**: Include interactive actions such as "Book Now" and "Remind Me Later".
- **Timeout**: Automatically close the notification after a specified duration.
- **User Interaction Handling**: Handle user interactions with the notification.

## Prerequisites

- Node.js installed on your system.

## Installation

1. **Clone the repository:**

   git clone https://github.com/your-username/movie-booking-alert-system.git
   cd movie-booking-alert-system

2. **Install dependencies:**

   npm install node-notifier open

## Usage

1. **Set up your notification logic:**

   Create a JavaScript file (e.g., `notify.js`) and include the following code:

   const notifier = require('node-notifier');
   const path = require('path');
   const open = require('open');

   // Replace this with your logic to determine if booking is open
   const isBookingOpen = true;

   if (isBookingOpen) {
   console.log('Booking Opened :', isBookingOpen);

   // Send a desktop notification
   notifier.notify({
   title: '🎬 Book Now Alert!',
   message: '🎟️ Booking Opened for the Movie! Hurry up and book your tickets!',
   icon: path.join(\_\_dirname, 'path-to-your-icon.png'), // Path to a custom icon
   sound: true, // Play system notification sound
   wait: true, // Wait with callback until user action is taken on notification
   actions: ['Book Now', 'Remind Me Later'], // Custom actions for the notification
   closeLabel: 'Ignore', // Custom close button label
   timeout: 60, // Auto close notification after 60 seconds
   }, function (err, response, metadata) {
   if (metadata && metadata.activationValue === 'Book Now') {
   console.log('User clicked Book Now');
   // Open the booking URL
   open('https://your-booking-url.com');
   } else if (metadata && metadata.activationValue === 'Remind Me Later') {
   console.log('User clicked Remind Me Later');
   // Schedule a reminder or perform any other action
   } else {
   console.log('User ignored the notification');
   }
   });
   }

   Replace `'path-to-your-icon.png'` with the actual path to your custom icon and `'https://your-booking-url.com'` with the actual URL for booking tickets.

2. **Run the script:**

   node notify.js

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [node-notifier](https://github.com/mikaelbr/node-notifier) for the desktop notification functionality.
- [open](https://github.com/sindresorhus/open) for opening URLs in the default browser.
