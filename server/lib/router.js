var path = require('path');
var config = require('../config/config.json');

exports.getRoute = function(route){
    return config.api_prefix + route;
};

exports.getRouteId = function(route){
    return config.api_prefix + route + "/:id";
};