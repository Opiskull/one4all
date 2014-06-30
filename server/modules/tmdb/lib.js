var mongoose = require('mongoose');
var Serie = mongoose.model('InfoTmdbSerie');
var Movie = mongoose.model('InfoTmdbMovie');
var request = require('request');

var authConfig = require(require('path').join(require('path').dirname(process.mainModule.filename),'config','config.json')).extapi.themoviedb;
var config = require('./config.json');

var client = request.defaults({
    json:true
});

function getRequest(options,cb){
    client.get(options, function (err, response, body) {
        if(err)
            return cb(err);
        return cb(null,body);
    });
}

function getConfig(cb){
    var paras = {
        qs:{
            query : search,api_key: authConfig.auth.api_key
        },
        url:config.ConfigurationUrl
    };
    getRequest(paras,function(err,result){
        if(err) return cb(err);

        cb(null,result);
    });
}

function searchSerie(search,cb){
    var paras = {
        qs:{
            query : search,api_key: authConfig.auth.api_key
        },
        url:config.SerieSearchUrl
    };

    getRequest(paras,function(err,result){
        if(err)
            return cb(err);

        var series = [];
        result.results.forEach(function(item){
            getSerie(item.id, function(err,info){
                if(info.poster_path && info.poster_path != null){
                    info.poster_path = config.ImageBaseUrl + config.ImagePosterSize + info.poster_path;
                }
                Serie.findOrCreate(info,function(err,serie){
                    if(err){
                        cb(err);
                    }
                    series.push(serie);
                    if(series.length === result.results.length){
                        cb(null,series);
                    }
                });
            });
        });
    });
}

function getMovie(id,cb){
    var paras = {
        qs:{
            api_key:authConfig.auth.api_key,
            append_to_response: 'alternative_titles'
        },
        url:config.MovieByIdUrl + id
    };
    getRequest(paras, function(err,result){
        if(err) return cb(err);

        cb(null,result);
    });
}

function getSerie(id,cb){
    var paras = {
        qs:{
            api_key:authConfig.auth.api_key,
            append_to_response: ''
        },
        url:config.SerieByIdUrl + id
    };
    getRequest(paras, function(err,result){
        if(err) return cb(err);

        cb(null,result);
    });
}

function searchMovie(search,cb){
    var paras = {
        qs:{
            query : search,api_key: authConfig.auth.api_key
        },
        url:config.MovieSearchUrl
    };

    getRequest(paras,function(err,result){
        if(err)
            return cb(err);

        var movies = [];
        result.results.forEach(function(item){
            getMovie(item.id,function(err,info){
                if(info.poster_path && info.poster_path != null){
                    info.poster_path = config.ImageBaseUrl + config.ImagePosterSize + info.poster_path;
                }
                Movie.findOrCreate(info,function(err,movie){
                    if(err){
                        cb(err);
                    }
                    movies.push(movie);
                    if(result.results.length === movies.length){
                        cb(null,movies);
                    }
                });
            });
        });
    });
}

exports.searchMovie = searchMovie;
exports.searchSerie = searchSerie;
exports.getConfig = getConfig;
exports.getMovie = getMovie;