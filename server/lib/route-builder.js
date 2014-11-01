var config = requireConfig('config.json');
var passport = require('passport');
var restify = require('restify');


var authenticate = function (req, res, next) {
    passport.authenticate('bearer', {session: false}, function (err, user, info) {
        if (err) return next(err);
        if (user) {
            req.user = user;
            return next();
        }
        return next(new restify.InvalidCredentialsError());
    })(req, res, next);
};

function getRoute(route) {
    return config.apiPrefix + route;
}

function getRouteAction(route, action) {
    return getRoute(route) + "/" + action;
}

function addAction(route, action) {
    return route + "/" + action;
}

function getRouteId(route, action) {
    var routeId = getRouteAction(route, ":id");
    if (action) {
        return addAction(routeId, action);
    }
    return routeId;
}

function getRouteIdWithAction(parent, action, actionid) {
    var parent = getRouteId(parent, action);
    if (actionid) {
        return addAction(parent, actionid);
    }
    return parent;
}

var isAuthenticated = [
    authenticate,
    function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return next(new restify.InvalidCredentialsError());
    }
];

exports.getSearchRoute = function (route) {
    return getRoute(route);
};

exports.getRoute = getRoute;

exports.getRouteId = getRouteId;

exports.getRouteIdWithAction = getRouteIdWithAction;

exports.authenticate = authenticate;

exports.isAuthenticated = isAuthenticated;

exports.registerDataController = function (server, controller) {
    server.get(getRoute(controller.route), isAuthenticated, controller.list);
    server.post(getRoute(controller.route), isAuthenticated, controller.create);
    server.get(getRouteId(controller.route), isAuthenticated, controller.load, controller.get);
    server.del(getRouteId(controller.route), isAuthenticated, controller.load, controller.del);
    server.put(getRouteId(controller.route), isAuthenticated, controller.load, controller.update);
};