const express = require('express');
const winston = require('winston');

app = express();


// load Logger
require('./startup/logger')();

// Connect to DataBase
require('./startup/db')();

// load the router
require('./startup/router')(app);


const port = process.env.NODE_PORT || 3000;
const server = app.listen(port, () => {winston.info('Listening on port ' + port)});

module.exports = server;
