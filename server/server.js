const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')));

require('./providers/AppProvider')(server);

module.exports = server