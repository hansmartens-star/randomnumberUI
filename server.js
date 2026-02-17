const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 8080;

// Configure axios to handle self-signed certificates if enabled
const allowSelfSignedCerts = process.env.ALLOW_SELF_SIGNED_CERTS === 'true' || process.env.ALLOW_SELF_SIGNED_CERTS === '1';
const httpsAgent = new https.Agent({
  rejectUnauthorized: allowSelfSignedCerts
});

// Create axios instance with custom HTTPS agent
const axiosInstance = axios.create({
  httpsAgent: httpsAgent
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint to get random number from the random number service
app.post('/api/random', async (req, res) => {
  try {
    const { seed } = req.body;

    // Call the random number service
    // TODO: Update this URL to point to your actual randomnumberservice
    const randomNumberServiceUrl = process.env.RANDOM_SERVICE_URL || 'https://randomnumberservice-hans.apps-crc.testing/random';
    
    const response = await axiosInstance.post(randomNumberServiceUrl, { "seed": seed });
    console.log(response.data)
    
    res.json({
      success: true,
      seed: seed,
      randomValue: response.data.randomNumber,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calling random number service:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate random number: ' + error.message
    });
  }
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Random Number Service URL: ${process.env.RANDOM_SERVICE_URL || 'https://randomnumberservice-hans.apps-crc.testing/random'}`);
  console.log(`Self-signed certificate support: ${allowSelfSignedCerts ? 'ENABLED' : 'DISABLED'}`);
});
