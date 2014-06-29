angular.module('providers').factory('malManga', ['Restangular', function (restangular) {
    var searchUrl = 'mal/manga/search';
    var detailUrl = 'providers/mal/manga-detail.html';
    var service = {
        title: 'mal-manga',
        display: 'My Anime List - Manga',
        category: 'manga',
        detailUrl: detailUrl,
        search: function (keyword) {
            return restangular.one(searchUrl + '?search=' + keyword).getList().then(function (items) {
                return restangular.stripRestangular(items);
            }, function () {

            });
        }
    };
    return service;
}]);