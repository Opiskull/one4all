var passport = require('passport');
module.exports.authenticate = passport.authenticate('github', {session: false});
module.exports.token = function (req, res) {
    res.header('Location', '/index.html#/login?token=' + req.authInfo.token);
    res.send(302);
};