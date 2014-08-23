require('./tmdb-movie-model.js');
require('./tmdb-serie-model.js');

var controller = require('./tmdb-controller');

module.exports.init = function (server, router) {
    server.get(router.getSearchRoute('/tmdb/serie/search'), controller.searchSerie);
    server.get(router.getSearchRoute('/tmdb/movie/search'), controller.searchMovie);
};
