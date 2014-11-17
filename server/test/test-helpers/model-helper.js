requireCore('user');
require(__rootdir + '/data-modules/anime');
require(__rootdir + '/data-modules/book');
require(__rootdir + '/data-modules/game');
requireCore('auth');

var mongoose = require('mongoose');
var config = require('./../config.json');
var testDataHelper = require('./testData-helper.js');
var expect = require('chai').expect;

mongoose.connect(config.mongourl);

var getModel = function (modelName) {
    return mongoose.model(modelName);
};

var getAll = function (modelName, filter, callback) {
    getModel(modelName).find(filter, callback);
};

var getAllWithTestUser = function (modelName, callback) {
    getAll(modelName, {user: new mongoose.Types.ObjectId(testDataHelper.UserId)}, function (err, items) {
        expect(err).to.be.equal(null);
        callback(err, items);
    });
};

var getRandomItem = function (modelName, callback) {
    getAllWithTestUser(modelName, function (err, items) {
        var item = items[Math.floor(Math.random() * items.length)];
        callback(err, item);
    });
};


module.exports = {
    get: getModel,
    getAll: getAll,
    getAllWithTestUser: getAllWithTestUser,
    getRandomItem: getRandomItem
};