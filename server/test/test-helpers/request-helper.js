var superagent = require('superagent');
var config = require('../config.json');

var TestDataHelper = require('./testData-helper.js');

function setToken(request, token) {
    if (!token)
        token = TestDataHelper.UserToken;
    return request.set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json');
}

var get = function (url, token) {
    var request = superagent.get(config.url + url);
    return setToken(request, token);
};

var post = function (url, data) {
    var request = superagent.post(config.url + url);
    return setToken(request).send(data);
};

var del = function (url, data) {
    var request = superagent.del(config.url + url);
    return setToken(request).send(data);
};

var put = function (url, data) {
    var request = superagent.put(config.url + url);
    return setToken(request).send(data);
};

var getAllItems = function (url, callback) {
    return get(url).end(function (e, res) {
        expect(e).to.be.equal(null);
        expect(res.body).to.be.an('array');
        callback(e, res.body);
    });
};

var delItem = function (url, itemId, callback) {
    return del(url + "/" + itemId).end(function (e, res) {
        expect(e).to.be.equal(null);
        callback(e, res.body);
    });
};

var updateItem = function (url, item, callback) {
    return put(url + "/" + item.id, item).end(function (e, res) {
        expect(e).to.be.equal(null);
        callback(e, res.body);
    });
};

module.exports = {
    get: get,
    post: post,
    del: del,
    getAllItems: getAllItems,
    delItem: delItem,
    updateItem: updateItem
};