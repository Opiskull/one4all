var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var config = requireConfig('auth/github.json');

var User = mongoose.model('User');
var AccessToken = mongoose.model('AccessToken');

var controller = require('./github-controller.js');

module.exports.init = function (server, router) {
    passport.use(new GitHubStrategy({
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: "https://peerzone.net/api/auth/github/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            profile.username = profile.username;
            if (profile.emails)
                profile.email = profile.emails[0].value;
            User.findOrCreate(profile, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                // Remove refreshToken not used
                var token = {token: accessToken, user: user._id};
                AccessToken.create(token, function (err, aToken) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, user, {token: aToken.token});
                });
            });
        }
    ));

    server.get(router.getRoute('/auth/github'), controller.authenticate);
    server.get(router.getRoute('/auth/github/callback'),
        passport.authenticate('github', {failureRedirect: '/login', session: false}), controller.token);
};
