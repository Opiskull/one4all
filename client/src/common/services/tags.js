angular.module('one4all').factory('tagsService', ['$q', 'apiService', function ($q, apiService) {
    return {
        getUserTags: function (query) {
            return apiService.get('user/used-tags?q=' + query);
        }
    }
}]);