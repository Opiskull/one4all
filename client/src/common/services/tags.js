angular.module('one4all').factory('tagsService', ['$q', 'authService', function ($q, authService) {
    return {
        getUserTags: function (query) {
            var deferred = $q.defer();
            deferred.resolve(authService.authInfo.user.usedTags);
            return deferred.promise;
        }
    }
}]);