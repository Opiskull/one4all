var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var User = mongoose.model('User');

module.exports.init = function (server,router) {

    passport.use(new GitHubStrategy({
            clientID: "4972e0999bd071af6f87",
            clientSecret: "b27d5c1286b66fd4db0fd9c83c08a517b6fe44db",
            callbackURL: "https://peerzone.net/api/auth/github/callback"
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

    server.get(router.getRoute('/auth/github'), passport.authenticate('github',{session:false}));
    server.get(router.getRoute('/auth/github/callback'),
        passport.authenticate('github', { failureRedirect: '/login' ,session:false}),
        function (req, res) {
            res.header('Location','/index.html#/login?token='+req.user.accessToken);
            res.send(302);
        });
};