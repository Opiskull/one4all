var passport = require('passport');
module.exports.authenticate = passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'], session: false
});
module.exports.token = function (req, res) {
    res.header('Location', '/index.html#/login?token=' + req.authInfo.token);
    res.send(302);
};