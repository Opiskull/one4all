var model = require('./game-model.js');
var controller = require('./game-controller.js');

var init = function (server, router) {
    router.registerDataController(server, controller);
};

module.exports = {
    init: init,
    model: model.Model,
    controller: controller,
    title: 'Game'
};