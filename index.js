// index.js
const express = require('express');
const app = express();

// Enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Route handler for the API endpoint
app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  // If no date is provided, return the current timestamp
  if (!dateString) {
    const currentTime = new Date();
    res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
    return;
  }

  let timestamp;

  // Check if the date string is a valid Unix timestamp
  if (/^\d+$/.test(dateString)) {
    timestamp = parseInt(dateString);
  } else {
    // Try to parse the date string using the Date constructor
    timestamp = Date.parse(dateString);
  }

  // If the timestamp is invalid, return an error response
  if (isNaN(timestamp)) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // Create a new Date object from the valid timestamp
  const date = new Date(timestamp);

  // Return the Unix timestamp and UTC string in the response
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});