// const express = require('express');
// const winston = require('winston');
import winston from 'winston'
import express from 'express'
import logger from './startup/logger.js'
import db from './startup/db.js'
import router from './startup/router.js'


const app = express();


// load Logger
logger();

// Connect to DataBase
db();

// load the router
router(app);


const port = process.env.NODE_PORT || 3000;

const server = app.listen(port, () => {winston.info('Listening on port ' + port)});

export default server;
