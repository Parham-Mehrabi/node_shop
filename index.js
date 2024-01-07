const express = require('express');

app = express();

require('./startup/router')(app);


const port = process.env.NODE_PORT || 3000
const server = app.listen(port, () => {console.log('Listening on port ' + port)})

module.exports = server;
