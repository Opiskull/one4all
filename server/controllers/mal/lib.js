var mongoose = require('mongoose');
var Anime = mongoose.model('cache_mal_anime');
var Manga = mongoose.model('cache_mal_manga');
var request = require('request');
var xml2js = require('xml2js');
var util = require('util');

var parser = new xml2js.Parser({
    explicitArray:false,
    trim: true,
    normalize:true,
    normalizeTags:true
});

var authConfig = require(require('path').join(require('path').dirname(process.mainModule.filename),'config','config.json')).extapi.mal;
var config = require('./config.json');

var client = request.defaults(authConfig);

function parseResult(result,type,cb){
    var items = [];
    result.forEach(function(item){
        type.findOrCreate(item,function(err,item){
            if(err){
                cb(err);
            }
            items.push(item);
            if(items.length === result.length){
                cb(null,items);
            }
        });
    });
}

function getXmlToJsonRequest(options,cb){
    client.get(options, function (err, response, body) {
        if(err)
            return cb(err);
        parser.parseString(body,function(err,result){
            if(err)
                return cb(err);


            if(result.anime){
                if(util.isArray(result.anime.entry))                {
                    return cb(null,result.anime.entry);
                } else{
                    return cb(null,[result.anime.entry]);
                }
            }
            if(result.manga){
                if(util.isArray(result.manga.entry))                {
                    return cb(null,result.manga.entry);
                } else{
                    return cb(null,[result.manga.entry]);
                }
            }
            return cb(null,[]);
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
        parseResult(result,Anime,cb);
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
        parseResult(result,Manga,cb);
    });
}

exports.searchAnime = searchAnime;
exports.searchManga = searchManga;