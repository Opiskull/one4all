var model = require('./manga-model.js');
var controller = require('./manga-controller.js');

module.exports.init = function (server, router) {
    router.registerDataController(server, controller);
};