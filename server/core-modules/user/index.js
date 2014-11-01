var User = require('./user-model.js');

var controller = require('./user-controller.js');

module.exports.init = function (server, router) {
    server.get(router.getRoute('/user/used-tags'), router.isAuthenticated, controller.usedTags);
};