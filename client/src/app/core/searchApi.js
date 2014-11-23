angular.module('core').factory('searchApiService', ['apiService', function (api) {

    function search(searchUrl, keyword) {
        var encodedKeyword = encodeURIComponent(keyword);
        return api.get(searchUrl + '?search=' + encodedKeyword);
    }

    return {
        searchRequest: function (searchUrl) {
            return function (keyword) {
                return search(searchUrl, keyword);
            }
        }
    };
}]);