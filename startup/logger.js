// const winston = require('winston')
import winston from 'winston'

const ENV = process.env.NODE_ENV

export default function () {
    const console_logger = new winston.transports.Console({
        level: 'info'
    });
    const file_logger = new winston.transports.File({
        level: 'silly',
        filename: 'logfile.log'
    });
    if ( ENV !== 'test'){
        winston.add(console_logger);
    }
    winston.add(file_logger);
}
