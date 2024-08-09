const express = require('express');
const cors = require('cors');
const ENV = {};
require('dotenv').config({
  processEnv: ENV
});
const mode = ENV.MODE;
if (mode === 'prod') {
  require('dotenv').config({
    processEnv: ENV,
    path: './.env.prod'
  });
}
console.info(ENV);
// 1. Configure the app.

const app = express();
// Configure cross-origin resource sharing
// TODO: once the app works okay, make this more strict.
app.use(
  cors({
    credentials: true,
    origin: true
  })
);
// The content of the http requests will be in json.
app.use(express.json());
// Import the router to handle the requests.
app.use('/', require('./base_router'));

// 2. Configure the server.
let server, port;
switch (ENV.MODE) {
  case 'dev':
    server = require('http').createServer(app);
    port = 6900;
    break;
  case 'prod':
    const { readFileSync } = require('fs');
    const options = {
      cert: readFileSync(ENV.CERT_PATH),
      key: readFileSync(ENV.KEY_PATH)
    };
    server = require('https').createServer(options, app);
    port = 6901;
    break;
  default:
    throw new Error('process.env.MODE is misconfigured!');
}

// 3. Start the server listening for the http requests.
server.listen(port, () => {
  protocol = process.env.MODE === 'dev' ? 'http' : 'https';
  console.log(`${protocol} server is listening on port ${port}.`);
});
