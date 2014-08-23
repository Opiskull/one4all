var model = require('./manga-model.js');
var controller = require('./manga-controller.js');

module.exports.init = function (server, router) {
    server.get(router.getRoute(controller.route), router.isAuthenticated, controller.list);
    server.post(router.getRoute(controller.route), router.isAuthenticated, controller.create);
    server.get(router.getRouteId(controller.route), router.isAuthenticated, controller.load, controller.get);
    server.del(router.getRouteId(controller.route), router.isAuthenticated, controller.load, controller.del);
    server.put(router.getRouteId(controller.route), router.isAuthenticated, controller.load, controller.update);
};