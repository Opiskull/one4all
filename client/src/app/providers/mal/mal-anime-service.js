angular.module('providers').factory('malAnime', ['searchApiService', function (searchApiService) {
    var searchUrl = 'mal/anime/search';
    var detailUrl = 'providers/mal/mal-anime-detail.html';
    return {
        title: 'mal-anime',
        display: 'My Anime List - Anime',
        category: 'anime',
        detailUrl: detailUrl,
        search: searchApiService.searchRequest(searchUrl)
    };
}]);