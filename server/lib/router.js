var config = require('../config/config.json');
var passport = require('passport');
var restify = require('restify');


var authenticate = passport.authenticate('bearer',{session:false});

exports.getSearchRoute = function(route){
    return config.api_prefix + route + "/:search";
};

exports.getRoute = function(route){
    return config.api_prefix + route;
};

exports.getRouteId = function(route){
    return config.api_prefix + route + "/:id";
};

exports.authenticate = authenticate;

exports.isAuthenticated = [
    authenticate,
    function(req,res,next){
        if(req.isAuthenticated()){
            next();
        }
        return next(new restify.InvalidCredentialsError());
    }
]