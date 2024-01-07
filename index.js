const express = require('express');

app = express();


// Connect to DataBase
require('./startup/db')();

// load the router
require('./startup/router')(app);


const port = process.env.NODE_PORT || 3000;
const server = app.listen(port, () => {console.log('Listening on port ' + port)});

module.exports = server;
