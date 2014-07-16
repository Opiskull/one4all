require('./book.js');

var lib = require('./lib.js');

function searchBooks(req, res, next) {
    lib.searchBooks(req.params.search,function(err,result){
        next.ifError(err);
        return res.json(result);
    });
}

module.exports.init = function (server, router) {
    server.get(router.getSearchRoute('/google/books/search'), searchBooks);
};