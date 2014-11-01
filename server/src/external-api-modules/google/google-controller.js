var lib = require('./google-lib.js');

function searchBooks(req, res, next) {
    lib.searchBooks(req.params.search, function (err, result) {
        next.ifError(err);
        return res.json(result);
    });
}

module.exports.searchBooks = searchBooks;



