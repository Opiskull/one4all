var mongoose = require('mongoose');

var authConfig = require(require('path').join(require('path').dirname(process.mainModule.filename),'config','config.json')).extapi.mal;
var config = require('./config.json');
var request = require('request');
var googleBook = mongoose.model('InfoGoogleBook');
var async = require('async');

var client = request.defaults({
    json:true
});

function createRequestParameters(url,search){
    return {
        qs:{
            q : search,
            fields:config.BooksFields
        },
        url: url
    };
}

function createRequest(options,cb){
    client.get(options, function (err, response, body) {
        if(err) return cb(err);
        return cb(null,body);
    });
}

function searchBooks(search,cb){
    var paras = createRequestParameters(config.BooksSearchUrl,search);
    createRequest(paras,function(err,result){
        if(err) return cb(err);

        async.concat(result.items, googleBook.findOrCreate.bind(googleBook), function(err,books){
            if(err) return cb(err);
            if(books) return cb(null,books);
        });
    })
}

exports.searchBooks = searchBooks;