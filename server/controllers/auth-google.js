var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = mongoose.model('User');

module.exports.init = function (server,router) {

    passport.use(new GoogleStrategy({
            clientID: "112130986867.apps.googleusercontent.com",
            clientSecret: "jGVZxdeFhklZ_5ApegNaa0A-",
            callbackURL: "https://peerzone.net/api/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate(profile, function (err, user) {
                if(err) {return done(err);}
                if(!user){return done(null,false);}
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                user.save(function(err){
                    if(err) {return done(err);}
                    return done(null, user);
                });
            });
        }
    ));

    passport.use(new BearerStrategy(
        function(token, done) {
            User.findOne({ accessToken: token }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user, { scope: 'read' });
            });
        }
    ));

    server.get(router.getRoute('/auth/google'), passport.authenticate('google'));
    server.get(router.getRoute('/auth/google/callback'),
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    server.get(router.getRoute('/logout'),function(req,res){
        req.logout();
        res.redirect('/');
    });
};