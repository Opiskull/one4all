var mongoose = require('mongoose');
var User = mongoose.model('User');
var AccessToken = mongoose.model('AccessToken');

var config = require('./config.json');
var superagent = require('superagent');

mongoose.connect(config.mongourl);

function getOrCreateUser(callback) {
    User.findOne({username: 'TestUser'}, function (err, user) {
        if (err) return callback(err);
        if (user) return callback(null, user._id);
        user = new User(TestData.TestUser);
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
        accessToken.token = TestData.TestToken.token;
        accessToken.user = userId;
        accessToken.save(function (err, token) {
            if (err) return callback(err);
            if (token) callback(null, token.token);
        });
    });
}

function getToken(callback) {
    getOrCreateUser(function (err, userId) {
        if (err) return callback(err);
        getOrCreateToken(userId, function (err, token) {
            if (err) return callback(err);
            callback(null, token);
        });
    });
}

function setToken(request, token) {
    if (!token)
        token = global.token;
    return request.set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json');
}

module.exports.GETRequest = function (url, token) {
    var request = superagent.get(config.url + url);
    return setToken(request, token);
};

module.exports.POSTRequest = function (url, data) {
    var request = superagent.post(config.url + url);
    return setToken(request).send(data);
};

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

module.exports.getModel = function (model) {
    return mongoose.model(model);
};