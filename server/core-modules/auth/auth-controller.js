var mongoose = require('mongoose');
var AccessToken = mongoose.model('AccessToken');

function logout(req, res) {
    AccessToken.removeWithToken(req.authInfo.token, function (err) {
        if (err) {
            res.json(err);
        }
        req.logout();
        res.header('Location', '/index.html');
        res.send(302);
    });
}

function authInfo(req, res) {
    if (req.isAuthenticated()) {
        var user = require('util')._extend({}, req.user.toObject());

        delete user.roles;
        delete user.accessToken;
        delete user.__v;
        res.json({
            user: user,
            roles: req.user.roles
        });
    } else {
        res.json({});
    }
}

module.exports.logout = logout;
module.exports.authInfo = authInfo;