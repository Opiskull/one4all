var mongoose = require('mongoose');
var restify = require('restify');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var config = require('../../config/config.json');

var User = mongoose.model('User');
var AccessToken = mongoose.model('AccessToken');

module.exports.init = function (server,router) {

    passport.use(new GoogleStrategy({
            clientID: config.auth.google.clientID,
            clientSecret: config.auth.google.clientSecret,
            callbackURL: "https://peerzone.net/api/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            profile.username = profile.displayName;
            User.findOrCreate(profile, function (err, user) {
                if(err) {return done(err);}
                if(!user){return done(null,false);}
                var token = {accessToken: accessToken, user: user._id, refreshToken: refreshToken};
                AccessToken.create(token, function(err, aToken){
                    if(err) {return done(err);}
                    return done(null, user, {token:aToken.accessToken});
                });
            });
        }
    ));

    server.get(router.getRoute('/auth/google'), passport.authenticate('google',{scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'],session:false}));
    server.get(router.getRoute('/auth/google/callback'),
        passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
        function (req, res) {
            res.header('Location','/index.html#/login?token='+req.authInfo.token);
                res.send(302);
        });
};