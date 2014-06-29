var config = require('../config/config.json');
var passport = require('passport');
var restify = require('restify');


var authenticate = passport.authenticate('bearer',{session:false});

function getRoute(route){
    return config.api_prefix + route;
}

function getRouteAction(route,action){
    return getRoute(route) +"/"+ action;
}

function addAction(route,action){
    return route + "/" + action;
}

function getRouteId(route, action){
    var routeId = getRouteAction(route,":id");
    if(action){
        return addAction(routeId,action);
    }
    return routeId;
}

function getRouteIdWithAction(route,action,actionid){
    var parent = getRouteId(parent,action);
    if(actionid){
        return addAction(parent,actionid);
    }
    return parent;
}

exports.getSearchRoute = function(route){
    //return getRouteAction(route,":search");,
    return getRoute(route);
};

exports.getRoute = getRoute;

exports.getRouteId = getRouteId;

exports.getRouteIdWithAction = getRouteIdWithAction;

// TODO check for partial info load
//exports.getInfoId = function(parentRoute){
//    return getRouteIdWithAction(parentRoute,'infos',':infoid');
//};
//
//exports.getInfo = function(parentRoute){
//    return getRouteIdWithAction(parentRoute,'infos');
//};

exports.authenticate = authenticate;

exports.isAuthenticated = [
    authenticate,
    function(req,res,next){
        if(req.isAuthenticated()){
            next();
        }
        return next(new restify.InvalidCredentialsError());
    }
];