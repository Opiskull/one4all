var lib = require('./mal-lib.js');

function searchAnime(req, res, next) {
    lib.searchAnime(req.params.search, function (err, result) {
        next.ifError(err);
        return res.json(result);
    });
}

function searchManga(req, res, next) {
    lib.searchManga(req.params.search, function (err, result) {
        next.ifError(err);
        return res.json(result);
    });
}

module.exports.searchAnime = searchAnime;
module.exports.searchManga = searchManga;