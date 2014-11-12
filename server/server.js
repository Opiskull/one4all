require('./src/lib/globals.js')(__dirname + "/src");
var restify = require('restify'), mongoose = require('mongoose'), passport = require('passport');
var errorHelper = requireLib('error-helper.js');
var modulesLoader = requireLib('modules-loader.js');
var logger = requireLib('logger.js');
var database = requireLib('database.js');


var config = requireConfig('config.json'), packageInfo = requireRoot('package.json');


var server = restify.createServer({
    name: packageInfo.name,
    version: packageInfo.version,
    log: logger,
    formatters: errorHelper.formatter
});

server.pre(function (req, res, next) {
    if (config.log.requests) {
        req.log.info({req: req});
    }
    return next();
});

server.on('uncaughtException', function (req, res, route, err) {
    req.log.error(err);
    req.log.error(route);
    req.log.error(req);
    res.send(new restify.InternalError('Internal server error'));
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(passport.initialize());

database.connect();

modulesLoader.loadServerModules(server);

var port = process.argv[2] || config.port;

server.listen(port, config.host, function () {
    server.log.info('%s listening at %s', server.name, server.url);
});

server.get(/\/?.*/, restify.serveStatic({
    directory: require('path').resolve('../client/build'),
    default: 'index.html'
}));




