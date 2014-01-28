var restify = require('restify');
var mongoose = require('mongoose');
var path = require('path');
var router = require('./lib/router.js');
var passport = require('passport');

var server = restify.createServer({
    name: 'watchlist',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

mongoose.connect('mongodb://localhost/test');

server.get(/\/static\/?.*/, restify.serveStatic({
    directory: path.resolve('../client/dist'),
    default: 'index.html'
}));

server.use(passport.initialize());

var modelpath = './models';
require("fs").readdirSync(modelpath).forEach(function(model){
    console.log('load model: ' + model);
    require(modelpath +'/'+ model);
});

var controllerpath = './controllers';
require("fs").readdirSync(controllerpath).forEach(function(controller){
    var ctrl = require(controllerpath +'/'+ controller);
    if(ctrl.init){
        console.log('load controller: ' + controller);
        ctrl.init(server,router);
    }
    else
        console.log('controller not loaded: ' + controller);
});





server.listen(3000, function(){
   console.log('%s listening at %s', server.name, server.url);
});
