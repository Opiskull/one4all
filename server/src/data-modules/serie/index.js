var model = require('./serie-model.js');
var controller = require('./serie-controller.js');

module.exports.init = function (server, router) {
    router.registerDataController(server, controller);
};