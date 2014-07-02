var mongoose = require('mongoose');
var Anime = mongoose.model('InfoMalAnime');
var Manga = mongoose.model('InfoMalManga');
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
    if(result.length === 0){
        return cb(null,items);
    }

    result.forEach(function(item){
        type.findOrCreate(item,function(err,item){
            if(err) return cb(err);
            items.push(item);
            if(items.length === result.length){
                return cb(null,items);
            }
        });
    });
}

function parseXmlToJson(options,cb){
    client.get(options, function (err, response, body) {
        if(err) return cb(err);

        if(body === "No results" || body === ''){
            return cb(null,[]);
        }

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

    parseXmlToJson(paras,function(err,result){
        if(err) return cb(err);
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

    parseXmlToJson(paras,function(err,result){
        if(err) return cb(err);
        parseResult(result,Manga,cb);
    });
}

exports.searchAnime = searchAnime;
exports.searchManga = searchManga;