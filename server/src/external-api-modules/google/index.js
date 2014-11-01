require('./google-book-model.js');

var controller = require('./google-controller.js');

module.exports.init = function (server, router) {
    server.get(router.getSearchRoute('/google/books/search'), controller.searchBooks);
};