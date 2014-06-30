require('./modelAnime.js');
require('./modelManga.js');

var lib = require('./lib.js');

function searchAnime(req, res, next) {
    lib.searchAnime(req.params.search,function(err,result){
        if(err)
            return next(err);
        return res.json(result);
    });
}

function searchManga(req,res,next){
    lib.searchManga(req.params.search,function(err,result){
        if(err)
            return next(err);
        return res.json(result);
    });
}

module.exports.init = function (server, router) {
    server.get(router.getSearchRoute('/mal/anime/search'), searchAnime);
    server.get(router.getSearchRoute('/mal/manga/search'), searchManga);
};