require('./mal-anime-model.js');
require('./mal-manga-model.js');

var controller = require('./mal-controller.js');

module.exports.init = function (server, router) {
    server.get(router.getSearchRoute('/mal/anime/search'), controller.searchAnime);
    server.get(router.getSearchRoute('/mal/manga/search'), controller.searchManga);
};