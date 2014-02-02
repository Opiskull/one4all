var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = mongoose.model('User');

module.exports.init = function (server,router) {
    passport.use(new BearerStrategy(
        function(token, done) {
            User.findByAccessToken(token, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user, { scope: 'read' });
            });
        }
    ));
    server.post(router.getRoute('/auth/logout'),router.isAuthenticated,function(req,res){
        req.user.accessToken = '';
        req.user.save(function(err){
            if(err){
                res.json({

                });
            }
            req.logout();
            res.header('Location','/index.html');
            res.send(302);
        });
    });
    server.get(router.getRoute('/auth/info'),router.isAuthenticated,function(req,res){
        if(req.isAuthenticated()){
            var user = require('util')._extend({},req.user);

            delete user.roles;
            delete user.accessToken;
            delete user.__v;


            res.json({
                user: user,
                roles: req.user.roles
            });
        } else{
            res.json({});
        }
    });
};