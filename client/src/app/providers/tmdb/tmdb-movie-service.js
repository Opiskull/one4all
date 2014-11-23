angular.module('providers').factory('tmdbMovie', ['searchApiService', function (searchApiService) {
    var searchUrl = 'tmdb/movie/search';
    var detailUrl = 'providers/tmdb/tmdb-movie-detail.html';
    return {
        title: 'tmdb-movie',
        display: 'The Movie DB - Movie',
        category: 'movie',
        detailUrl: detailUrl,
        search: searchApiService.searchRequest(searchUrl)
    };
}]);