var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var config = requireConfig('auth/google.json');

var User = mongoose.model('User');
var AccessToken = mongoose.model('AccessToken');

var controller = require('./google-controller');

module.exports.init = function (server, router) {
    passport.use(new GoogleStrategy({
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: "https://peerzone.net/api/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            profile.username = profile.displayName;
            User.findOrCreate(profile, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                // Remove refreshToken not used
                //var token = {accessToken: accessToken, user: user._id, refreshToken: refreshToken};
                AccessToken.create(token, function (err, aToken) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, user, {token: aToken.accessToken});
                });
            });
        }
    ));
    server.get(router.getRoute('/auth/google'), controller.authenticate);
    server.get(router.getRoute('/auth/google/callback'), passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }), controller.token);
};