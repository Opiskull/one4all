var async = require('async');

var RequestHelper = require('./request-helper.js');
var ModelHelper = require('./model-helper.js');

var expect = require('chai').expect;

var getRequestAndModelItems = function (requestUrl, modelName, cb) {
    var result = {
        requestItems: [],
        modelItems: []
    };

    async.series([
        function (callback) {
            RequestHelper.getAllItems(requestUrl, function (e, items) {
                expect(e).to.be.equal(null);
                result.requestItems = items;
                callback();
            });
        },
        function (callback) {
            ModelHelper.getAllWithTestUser(modelName, function (err, items) {
                result.modelItems = items;
                callback();
            });
        }
    ], function (err) {
        cb(err, result);
    });
};

var getRequestItemsAfterFunction = function (requestUrl, functionToCall, cb) {
    var result = {
        beforeItems: [],
        afterItems: []
    };
    async.series([
        function (callback) {
            RequestHelper.getAllItems(requestUrl, function (e, items) {
                result.beforeItems = items;
                callback();
            });
        },
        function (callback) {
            functionToCall(result, callback);
        },
        function (callback) {
            RequestHelper.getAllItems(requestUrl, function (e, items) {
                result.afterItems = items;
                callback();
            });
        }
    ], function (err) {
        cb(err, result);
    });
};

module.exports = {
    getRequestAndModelItems: getRequestAndModelItems,
    getRequestItemsAfterFunction: getRequestItemsAfterFunction
};