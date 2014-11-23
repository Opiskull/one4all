angular.module('providers').factory('malManga', ['searchApiService', function (searchApiService) {
    var searchUrl = 'mal/manga/search';
    var detailUrl = 'providers/mal/mal-manga-detail.html';
    return {
        title: 'mal-manga',
        display: 'My Anime List - Manga',
        category: 'manga',
        detailUrl: detailUrl,
        search: searchApiService.searchRequest(searchUrl)
    };
}]);