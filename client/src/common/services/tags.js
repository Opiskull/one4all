angular.module('one4all').factory('tagsService', ['$q', 'Restangular', function ($q, Restangular) {
    return {
        getUserTags: function (query) {
            return Restangular.all('user/used-tags').getList({q: query});
        }
    }
}]);