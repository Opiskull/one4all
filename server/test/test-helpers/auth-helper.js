var ModelHelper = require('./model-helper.js');
var TestDataHelper = require('./testData-helper.js');

var mongoose = require('mongoose');
var User = ModelHelper.get('User');
var AccessToken = ModelHelper.get('AccessToken');

function getOrCreateUser(callback) {
    User.findOne({username: 'TestUser'}, function (err, user) {
        if (err) return callback(err);
        if (user) return callback(null, user._id);
        user = new User(TestDataHelper.User);
        user.save(function (err, user) {
            if (err) return callback(err);
            if (user) {
                callback(null, user._id);
            }
        });
    });
}

function getOrCreateToken(userId, callback) {
    AccessToken.findOne({user: userId}, function (err, accessToken) {
        if (err) return callback(err);
        if (accessToken) return callback(null, accessToken.token);
        accessToken = new AccessToken();
        accessToken.token = TestDataHelper.Token.token;
        accessToken.user = userId;
        accessToken.save(function (err, token) {
            if (err) return callback(err);
            if (token) callback(null, token.token);
        });
    });
}

module.exports.setGlobalUser = function (done) {
    getOrCreateUser(function (err, userId) {
        if (err) done(err);
        TestDataHelper.UserId = userId;
        getOrCreateToken(userId, function (err, token) {
            if (err) return done(err);
            TestDataHelper.UserToken = token;
            done();
        });
    });
};