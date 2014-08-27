angular.module('providers').factory('malAnime', ['Restangular', function (restangular) {
    var searchUrl = 'mal/anime/search';
    var detailUrl = 'providers/mal/anime-detail.html';
    return {
        title: 'mal-anime',
        display: 'My Anime List - Anime',
        category: 'anime',
        detailUrl: detailUrl,
        search: function (keyword) {
            return restangular.one(searchUrl + '?search=' + keyword).getList().then(function (items) {
                return restangular.stripRestangular(items);
            }, function () {

            });
        }
    };
}]);