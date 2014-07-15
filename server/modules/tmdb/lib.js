var mongoose = require('mongoose');
var Serie = mongoose.model('InfoTmdbSerie');
var Movie = mongoose.model('InfoTmdbMovie');
var request = require('request');
var async = require('async');

var authConfig = require(require('path').join(require('path').dirname(process.mainModule.filename),'config','config.json')).extapi.themoviedb;
var config = require('./config.json');

var client = request.defaults({
    json:true
});

function createDefaultParameters(url){
    return {
        qs: {
            api_key: authConfig.auth.api_key
        },
        url: url
    };
}

function createPosterPath(info){
    if(info.poster_path && info.poster_path != null){
        info.poster_path = config.ImageBaseUrl + config.ImagePosterSize + info.poster_path;
    }
}

function createRequest(options,cb){
    client.get(options, function (err, response, body) {
        if(err) return cb(err);
        return cb(null,body);
    });
}

function findItemInfoWithId(type,getItem){
    return function(item,cb){
        type.findWithId(item.id, function(err, itemInfo){
            if(err) return cb(err);
            if(itemInfo) return cb(null,itemInfo);
            getItem(item.id, function(err,originalInfo){
                createPosterPath(originalInfo);
                type.findOrCreate(originalInfo,function(err,info){
                    if(err) return cb(err);
                    if(info) return cb(null,info);
                });
            });
        });
    }
}

function getConfig(cb){
    var parameters = createDefaultParameters(config.ConfigurationUrl);
    createRequest(parameters,function(err,result){
        if(err) return cb(err);
        cb(null,result);
    });
}

function getMovie(id,cb){
    var parameters = createDefaultParameters(config.MovieByIdUrl+ id);
    parameters.qs.append_to_response = 'alternative_titles';
    createRequest(parameters, function(err,result){
        if(err) return cb(err);
        cb(null,result);
    });
}

function getSerie(id,cb){
    var parameters = createDefaultParameters(config.SerieByIdUrl + id);
    createRequest(parameters, function(err,result){
        if(err) return cb(err);
        cb(null,result);
    });
}

function searchMovie(search,cb){
    var parameters = createDefaultParameters(config.MovieSearchUrl);
    parameters.qs.query = search;
    createRequest(parameters,function(err,result){
        if(err) return cb(err);
        async.concat(result.results, findItemInfoWithId(Movie,getMovie), function(err, movies){
            if(err) return cb(err);
            if(movies) return cb(null,movies);
        });
    });
}

function searchSerie(search,cb){
    var parameters = createDefaultParameters(config.SerieSearchUrl);
    parameters.qs.query = search;
    createRequest(parameters,function(err,result){
        if(err) return cb(err);
        async.concat(result.results, findItemInfoWithId(Serie,getSerie), function(err, series){
            if(err) return cb(err);
            if(series) return cb(null,series);
        });
    });
}

exports.searchMovie = searchMovie;
exports.searchSerie = searchSerie;
exports.getConfig = getConfig;
exports.getMovie = getMovie;