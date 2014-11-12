var mongoose = require('mongoose');
var User = require('../src/core-modules/user/user-model.js').model;
var AccessToken = require('../src/core-modules/auth/auth-accesstoken-model.js').model;
var testData = require('./test-data.js');
var config = require('./config.json');

mongoose.connect(config.mongourl);

function getOrCreateUser(callback) {
    User.findOne({username: 'TestUser'}, function (err, user) {
        if (err) return callback(err);
        if (user) return callback(null, user._id);
        user = new User(testData.TestUser);
        user.save(function (err, user) {
            if (err) return callback(err);
            if (user) {
                callback(null, user._id);
            }
        });
    });
}

function getOrCreateToken(userId,callback) {
    AccessToken.findOne({user: userId}, function (err, accessToken) {
        if (err) return callback(err);
        if (accessToken) return callback(null, accessToken.token);
        accessToken = new AccessToken();
        accessToken.token = testData.TestToken.token;
        accessToken.user = userId;
        accessToken.save(function (err, token) {
            if (err) return callback(err);
            if (token) callback(null, token.token);
        });
    });
}

function getToken(callback){
    getOrCreateUser(function(err, userId){
        if(err) return callback(err);
        getOrCreateToken(userId,function(err,token){
            if(err) return callback(err);
            callback(null,token);
        });
    });
}

var superagent = require('superagent');
module.exports.requestHelper = function(url, token){
    if(!token)
        token = global.token;

    return superagent.get(config.url + url)
        .set('Authorization','Bearer ' + token)
        .set('Accept','application/json');
};

module.exports.TestData = testData;

module.exports.AccessToken = AccessToken;

module.exports.setGlobalToken = function (done) {
    getToken(function (err, token) {
        if (err) done(err);
        global.token = token;
        done();
    });
};

module.exports.setGlobalUser = function (done) {
    getOrCreateUser(function (err, userId) {
        if (err) done(err);
        global.userId = userId;
        getOrCreateToken(userId, function (err, token) {
            if (err) return done(err);
            global.token = token;
            done();
        });
    });
};