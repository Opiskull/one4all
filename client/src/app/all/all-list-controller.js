angular.module('data.all')
    .controller('AllListCtrl', ['$scope', 'itemCacheService', 'paginationCacheService', '$rootScope', 'filterService', 'settingsService', function ($scope, itemCache, paginationCache, $rootScope, filterService, settingsService) {
        var pCache = paginationCache.getCache();

        $scope.modules = function () {
            return Object.keys(pCache);
        };
        $scope.pCache = pCache;

        var delFilter = $rootScope.$on('filter', function () {
            filterService.filterAllResources();
        });

        $scope.$on('$destroy', function () {
            delFilter();
        });

        $rootScope.$emit('filter');
    }]);