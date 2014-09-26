var mongoose = require('mongoose');
var routes = require('./routes.json');
var request = require('request');
var googleBook = mongoose.model('InfoGoogleBook');
var async = require('async');

var client = request.defaults({
    json: true
});

function createRequestParameters(url, search) {
    return {
        qs: {
            q: search,
            fields: routes.BooksFields
        },
        url: url
    };
}

function createRequest(options, cb) {
    client.get(options, function (err, response, body) {
        if (err) return cb(err);
        return cb(null, body);
    });
}

function searchBooks(search, cb) {
    var paras = createRequestParameters(routes.BooksSearchUrl, search);
    createRequest(paras, function (err, result) {
        if (err) return cb(err);

        async.concat(result.items, googleBook.findOrCreate.bind(googleBook), function (err, books) {
            if (err) return cb(err);
            if (books) return cb(null, books);
        });
    })
}

exports.searchBooks = searchBooks;