var mongoose = require('mongoose');
var Anime = mongoose.model('cache_mal_anime');
var Manga = mongoose.model('cache_mal_manga');
var request = require('request');
var xml2js = require('xml2js');

var parser = new xml2js.Parser({
    explicitArray:false,
    trim: true,
    normalize:true,
    normalizeTags:true
});

var authConfig = require(require('path').join(require('path').dirname(process.mainModule.filename),'config','config.json')).extapi.mal;
var config = require('./config.json');

var client = request.defaults(authConfig);

function getXmlToJsonRequest(options,cb){
    client.get(options, function (err, response, body) {
        if(err)
            return cb(err);
        parser.parseString(body,function(err,result){
            if(err)
                return cb(err);
            cb(null,result);
        });
    });
}

function searchAnime(search,cb){
    var paras = {
        qs:{
            q : search
        },
        url:config.AnimeSearchUrl
    };

    getXmlToJsonRequest(paras,function(err,result){
        if(err)
            return cb(err);

        var animes = [];
        result.anime.entry.forEach(function(item){
            Anime.findOrCreate(item,function(err,anime){
                if(err){
                    cb(err);
                }
                animes.push(anime);
                if(animes.length === result.anime.entry.length){
                    cb(null,animes);
                }
            });
        });
    });
}

function searchManga(search,cb){
    var paras = {
        qs:{
            q : search
        },
        url:config.MangaSearchUrl
    };

    getXmlToJsonRequest(paras,function(err,result){
        if(err)
            return cb(err);

        var mangas = [];
        result.manga.entry.forEach(function(item){
            Manga.findOrCreate(item,function(err,manga){
                if(err){
                    cb(err);
                }
                mangas.push(manga);
                if(result.manga.entry.length === mangas.length){
                    cb(null,mangas);
                }
            });
        });
    });
}

exports.searchAnime = searchAnime;
exports.searchManga = searchManga;