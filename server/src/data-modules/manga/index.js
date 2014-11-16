var model = require('./manga-model.js');
var controller = require('./manga-controller.js');

var init = function (server, router) {
    router.registerDataController(server, controller);
};

module.exports = {
    init: init,
    model: model.Model,
    controller: controller,
    title: 'Manga'
};