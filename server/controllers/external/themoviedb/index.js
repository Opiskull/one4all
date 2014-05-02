var lib = require('./lib.js');
var tmdbConfig = {};

function searchMovie(req, res, next) {
    lib.searchMovie(req.params.search,function(err,result){
        if(err)
            return next();
        return res.json(result);
    });
}

function searchSerie(req,res,next){
    lib.searchSerie(req.params.search,function(err,result){
        if(err)
            return next();
        return res.json(result);
    });
}

function getConfiguration(){
    lib.getConfig(function(err,result){
        tmdbConfig = result;
    });
}

module.exports.init = function (server, router) {
    server.get(router.getSearchRoute('/tmdb/serie/search'), searchSerie);
    server.get(router.getSearchRoute('/tmdb/movie/search'), searchMovie);
};
