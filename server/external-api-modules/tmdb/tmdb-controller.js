var lib = require('./tmdb-lib.js');
//var tmdbConfig = {};

function searchMovie(req, res, next) {
    lib.searchMovie(req.params.search, function (err, result) {
        next.ifError(err);
        return res.json(result);
    });
}

function searchSerie(req, res, next) {
    lib.searchSerie(req.params.search, function (err, result) {
        next.ifError(err);
        return res.json(result);
    });
}

//function getConfiguration() {
//    lib.getConfig(function (err, result) {
//        tmdbConfig = result;
//    });
//}

module.exports.searchMovie = searchMovie;
module.exports.searchSerie = searchSerie;