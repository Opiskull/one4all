var mongoose = require('mongoose');
var Anime = mongoose.model('InfoMalAnime');
var Manga = mongoose.model('InfoMalManga');
var request = require('request');
var xml2js = require('xml2js');
var util = require('util');
var async = require('async');

var parser = new xml2js.Parser({
    explicitArray: false,
    trim: true,
    normalize: true,
    normalizeTags: true
});

var authConfig =
    rootRequire('config/config.json').extapi.mal;
var config = require('./config.json');

var client = request.defaults(authConfig);

function createRequestParameters(url, search) {
    return {
        qs: {
            q: search
        },
        url: url
    };
}

function parseResult(result, type, cb) {
    if (result.length === 0) return cb(null, []);
    async.concat(result, type.findOrCreate.bind(type), function (err, items) {
        if (err) return cb(err);
        if (items) return cb(null, items);
    });
}

function objectExists(object, cb) {
    if (util.isArray(object.entry)) return cb(null, object.entry);
    else return cb(null, [object.entry]);
}

function parseXmlToJson(options, cb) {
    client.get(options, function (err, response, body) {
        if (err) return cb(err);
        if (body === "No results" || body === '') {
            return cb(null, []);
        }
        parser.parseString(body, function (err, result) {
            if (err) return cb(err);
            if (result.anime) {
                objectExists(result.anime, cb);
            }
            if (result.manga) {
                objectExists(result.manga, cb);
            }
        });
    });
}

function searchAnime(search, cb) {
    var paras = createRequestParameters(config.AnimeSearchUrl, search);
    parseXmlToJson(paras, function (err, result) {
        if (err) return cb(err);
        parseResult(result, Anime, cb);
    });
}

function searchManga(search, cb) {
    var paras = createRequestParameters(config.MangaSearchUrl, search);
    parseXmlToJson(paras, function (err, result) {
        if (err) return cb(err);
        parseResult(result, Manga, cb);
    });
}

exports.searchAnime = searchAnime;
exports.searchManga = searchManga;