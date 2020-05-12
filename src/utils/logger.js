const winston = require('winston')
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

const logRequest = function(message) {
    logger.info(message);
};

const logError = function(err) {
    logger.error(err)
};
module.exports = {
    logRequest,
    logError
}