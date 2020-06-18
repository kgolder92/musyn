require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
require('./controller/messenger')(io);
const compositionController = require('./controller/composition');
const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use(express.static(PUBLIC_DIR));

app.use('/compositions/:hash', compositionController.serve(PUBLIC_DIR));

app.use('/api', bodyParser.json(), apiRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT);
});
