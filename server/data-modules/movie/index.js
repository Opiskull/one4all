var model = require('./movie-model.js');
var controller = require('./movie-controller.js');

module.exports.init = function (server, router) {
    router.registerDataController(server, controller);
};