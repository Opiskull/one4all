var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var config = require('../../config/config.json');

var User = mongoose.model('User');

module.exports.init = function (server,router) {

    passport.use(new GitHubStrategy({
            clientID: config.auth.github.clientID,
            clientSecret: config.auth.github.clientSecret,
            callbackURL: "https://peerzone.net/api/auth/github/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            profile.username = profile.username;
            if(profile.emails)
                profile.email = profile.emails[0].value;
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

    server.get(router.getRoute('/auth/github'), passport.authenticate('github',{session:false}));
    server.get(router.getRoute('/auth/github/callback'),
        passport.authenticate('github', { failureRedirect: '/login' ,session:false}),
        function (req, res) {
            res.header('Location','/index.html#/login?token='+req.user.accessToken);
            res.send(302);
        });
};