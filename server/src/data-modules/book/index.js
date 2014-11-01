var model = require('./book-model.js');
var controller = require('./book-controller.js');

module.exports.init = function (server, router) {
    router.registerDataController(server, controller);
};