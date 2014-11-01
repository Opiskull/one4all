var model = require('./game-model.js');
var controller = require('./game-controller.js');

module.exports.init = function (server, router) {
    router.registerDataController(server, controller);
};