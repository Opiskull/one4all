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

    server.use(passport.initialize());

    server.get(router.getRoute('/auth/google'), passport.authenticate('google',{scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'],session:false}));
    server.get(router.getRoute('/auth/google/callback'),
        passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
        function (req, res) {
            res.header('Location','/static/index.html#/login?token='+req.user.accessToken);
            res.send(302);
        });
    server.post(router.getRoute('/auth/logout'),function(req,res){
        req.logout();
        res.header('Location','/static/index.html');
        res.send(302);
    });
    server.get(router.getRoute('/auth/info'),router.isAuthenticated(),function(req,res){
        if(req.isAuthenticated()){
            res.json({
                user: req.user
            });
        } else{
            res.json({});
        }
    });
};