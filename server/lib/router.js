var path = require('path');
var config = require('../config/config.json');
var passport = require('passport');

exports.getRoute = function(route){
    return config.api_prefix + route;
};

exports.getRouteId = function(route){
    return config.api_prefix + route + "/:id";
};

exports.authenticate = function(){return passport.authenticate('bearer',{session:false});};