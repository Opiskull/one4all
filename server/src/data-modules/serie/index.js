var model = require('./serie-model.js');
var controller = require('./serie-controller.js');

var init = function (server, router) {
    router.registerDataController(server, controller);
};

module.exports = {
    init: init,
    model: model.Model,
    controller: controller,
    title: 'Serie'
};