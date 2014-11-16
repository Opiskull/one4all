var model = require('./book-model.js');
var controller = require('./book-controller.js');

var init = function (server, router) {
    router.registerDataController(server, controller);
};

module.exports = {
    init: init,
    model: model.Model,
    controller: controller,
    title: 'Book'
};