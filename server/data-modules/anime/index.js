var model = require('./anime-model.js');
var controller = require('./anime-controller.js');

module.exports.init = function (server, router) {
    router.registerDataController(server, controller);
};