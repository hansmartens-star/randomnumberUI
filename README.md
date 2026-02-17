# Random Number Generator UI

A Node.js + React application that provides a user interface to generate random numbers using a seed value from a random number service.

## Features

- **React User Interface**: Clean, modern UI for interacting with the random number service
- **Seed Input**: Specify a seed value to generate deterministic random numbers
- **Real-time Results**: Display generated random values with timestamps
- **Error Handling**: Graceful error handling and user feedback

## Project Structure

```
randomnumberUI/
├── src/                      # React source files
│   ├── index.js             # React entry point
│   ├── App.js               # Main App component
│   └── App.css              # Styling
├── public/
│   └── index.html           # HTML template
├── server.js                # Express server
├── webpack.config.js        # Webpack configuration
├── .babelrc                 # Babel configuration
├── package.json             # Python dependencies
└── README.md                # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Update the `RANDOM_SERVICE_URL` environment variable or modify the default in `server.js`:
```bash
set RANDOM_SERVICE_URL=http://your-random-service-url/api/random
```

## Running the Application

### Development Mode
Builds the React app in development mode and starts the webpack dev server:
```bash
npm run dev
```

### Production Build
Builds the React app for production:
```bash
npm run build
```

### Start Server
Starts the Node.js Express server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Specification

### POST /api/random

Request body:
```json
{
  "seed": <integer>
}
```

Response body (on success):
```json
{
  "success": true,
  "seed": <integer>,
  "randomValue": <value>,
  "timestamp": "<ISO timestamp>"
}
```

Response body (on error):
```json
{
  "success": false,
  "error": "<error message>"
}
```

## Configuration

The application expects a random number service to be available. By default, it looks for:
```
https://randomnumberservice-hans.apps-crc.testing/random
```

You can override this by setting the `RANDOM_SERVICE_URL` environment variable:
```bash
set RANDOM_SERVICE_URL=https://your-service:port/api/endpoint
```

### Self-Signed Certificates

If your random number service uses a self-signed SSL/TLS certificate, you can enable support for it by setting the `ALLOW_SELF_SIGNED_CERTS` environment variable:

```bash
set ALLOW_SELF_SIGNED_CERTS=true
```

**⚠️ WARNING:** This setting disables SSL certificate validation. Only use this for development and testing environments. Do NOT use this in production.

Alternatively, you can create a `.env` file in the project root:
```env
RANDOM_SERVICE_URL=https://your-service:port/api/endpoint
ALLOW_SELF_SIGNED_CERTS=true
```

## Technologies Used

- **Node.js & Express**: Backend server
- **React**: Frontend UI framework
- **Webpack**: Module bundler
- **Babel**: JavaScript transpiler
- **Axios**: HTTP client for the backend

## Browser Support

Works on all modern browsers that support ES6+ and React 18.

## License

ISC

## Notes

- The application assumes the random number service is accessible and responds with a `value` or `randomValue` field in the response
- The seed input field is required
- All random number generation calls are logged server-side for debugging
