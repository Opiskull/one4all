var model = require('./movie-model.js');
var controller = require('./movie-controller.js');

var init = function (server, router) {
    router.registerDataController(server, controller);
};

module.exports = {
    init: init,
    model: model.Model,
    controller: controller,
    title: 'Movie'
};