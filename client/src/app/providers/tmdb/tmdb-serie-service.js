angular.module('providers').factory('tmdbSerie', ['searchApiService', function (searchApiService) {
    var searchUrl = 'tmdb/serie/search';
    var detailUrl = 'providers/tmdb/tmdb-serie-detail.html';
    return {
        title: 'tmdb-serie',
        display: 'The Movie DB - Serie',
        category: 'serie',
        detailUrl: detailUrl,
        search: searchApiService.searchRequest(searchUrl)
    };
}]);