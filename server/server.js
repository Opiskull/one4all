var restify = require('restify'), mongoose = require('mongoose'), path = require('path'), passport = require('passport'), fs = require('fs'), bunyan = require('bunyan');
var router = require('./lib/router.js');
var modules = require('./lib/modules.js');

var config = require('./config/config.json'), packageInfo = require('./package.json');
var logger = bunyan.createLogger({
    name: packageInfo.name,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'info',
            path: config.log.file
        }
    ],
    serializers: bunyan.stdSerializers
});

var server = restify.createServer({
    name: packageInfo.name,
    version: packageInfo.version,
    log: logger
});

server.pre(function (req, res, next) {
    if (config.log.requests) {
        req.log.info({req: req});
    }
    return next();
});

server.on('uncaughtException', function (req, res, route, err) {
    req.log.error(err);
    res.send(new restify.InternalError('Internal server error'));
});

mongoose.connect(config.db.url);

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

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(passport.initialize());

var modelpath = __dirname + config.models;
var controllerpath = __dirname + config.controllers;
var modulespath = __dirname + config.modules;

modules.loadModels(modelpath, server);
modules.loadControllers(controllerpath, server);
modules.loadModules(modulespath, server);

server.listen(config.port, config.host, function () {
    server.log.info('%s listening at %s', server.name, server.url);
});

server.get(/\/?.*/, restify.serveStatic({
    directory: path.resolve('../client/build'),
    default: 'index.html'
}));
