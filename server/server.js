/* modules */

var restify = require('restify'),mongoose = require('mongoose'),path = require('path'),passport = require('passport'), fs = require('fs');
var router = require('./lib/router.js');
var modules = require('./lib/modules.js');

var config = require('./config/config.json'),packageInfo = require('./package.json');

var server = restify.createServer({
    name: packageInfo.name,
    version: packageInfo.version
});


mongoose.connect(config.db_url);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(passport.initialize());


server.get(/\/static\/?.*/, restify.serveStatic({
    directory: path.resolve('../client/build'),
    default: 'index.html'
}));

var modelpath = __dirname + config.models;
var controllerpath = __dirname + config.controllers;

modules.loadModels(modelpath);
modules.loadControllers(controllerpath,server);

server.listen(config.port,config.host, function(){
   console.log('%s listening at %s', server.name, server.url);
});
