angular.module('providers').factory('googleBooks', ['searchApiService', function (searchApiService) {
    var searchUrl = 'google/books/search';
    var detailUrl = 'providers/google/google-book-detail.html';
    return {
        title: 'google-books',
        display: 'Google - Books',
        category: 'book',
        detailUrl: detailUrl,
        search: searchApiService.searchRequest(searchUrl)
    };
}]);