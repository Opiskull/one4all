requireCore('user');
require('./auth-accesstoken-model.js');

var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = mongoose.model('User');
var AccessToken = mongoose.model('AccessToken');

var controller = require('./auth-controller.js');
var moduleLoader = requireLib('modules-loader.js');

module.exports.init = function (server, router, path) {
    passport.use(new BearerStrategy(
        function (token, done) {
            AccessToken.findUserByToken(token, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, {scope: 'read', token: token});
            });
        }
    ));
    server.post(router.getRoute('/auth/logout'), router.isAuthenticated, controller.logout);
    server.get(router.getRoute('/auth/info'), router.isAuthenticated, controller.authInfo);
    moduleLoader.loadModulesFromDirectory(path, 'modules', function (module, moduleName) {
        module.init(server, router);
    });
};