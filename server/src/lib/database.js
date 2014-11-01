var mongoose = require('mongoose');
var config = requireConfig('config.json');
var logger = require('./logger.js');

mongoose.connection.on('error', function (err) {
    logger.error(err, 'DB connection Error');
});
mongoose.connection.on('connected', function () {
    logger.info('DB connection established!');
});
mongoose.connection.on('disconnected', function () {
    logger.info('DB connection disconnected!');
});
mongoose.connection.on('close', function () {
    logger.info('DB connection closed!');
});
mongoose.connection.on('open', function () {
    logger.info('DB connection opened!');
});
mongoose.connection.on('reconnected', function () {
    logger.info('DB connection reconnected!');
});

module.exports.connect = function () {
    mongoose.connect(config.db.url);
};