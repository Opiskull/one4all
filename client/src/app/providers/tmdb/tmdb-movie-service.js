angular.module('providers').factory('tmdbMovie', ['Restangular', function (restangular) {
    var searchUrl = 'tmdb/movie/search';
    var detailUrl = 'providers/tmdb/tmdb-movie-detail.html';
    return {
        title: 'tmdb-movie',
        display: 'The Movie DB - Movie',
        category: 'movie',
        detailUrl: detailUrl,
        search: function (keyword) {
            return restangular.one(searchUrl + '?search=' + keyword).getList().then(function (items) {
                return restangular.stripRestangular(items);
            }, function () {

            });
        }
    };
}]);