var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = mongoose.model('User');

module.exports.init = function (server,router) {

    passport.use(new BearerStrategy(
        function(token, done) {
            User.findOne({ accessToken: token }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user, { scope: 'read' });
            });
        }
    ));
    server.post(router.getRoute('/auth/logout'),function(req,res){
        req.logout();
        res.header('Location','/static/index.html');
        res.send(302);
    });
    server.get(router.getRoute('/auth/info'),router.authenticate(),function(req,res){
        if(req.isAuthenticated()){
            res.json({
                user: req.user,
                roles: req.user.roles
            });
        } else{
            res.json({});
        }
    });
};