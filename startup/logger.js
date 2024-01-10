const winston = require('winston')


module.exports = function () {
    const console_logger = new winston.transports.Console({
        level: 'info'
    });
    const file_logger = new winston.transports.File({
        level: 'silly',
        filename: 'logfile.log'
    });
    winston.add(console_logger);
    winston.add(file_logger);
}