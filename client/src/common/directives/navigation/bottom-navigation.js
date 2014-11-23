angular.module('one4all').directive('bottomNavigation', ['$rootScope', 'filterService', '$routeParams', function ($rootScope, filterService, $routeParams) {
    return {
        restrict: 'E',
        templateUrl: 'directives/navigation/bottom-navigation.html',
        link: function (scope, element, attrs) {
        },
        scope: {
            resource: '@',
            add: '&'
        },
        controller: ['$scope', '$rootScope', 'itemCacheService', 'paginationCacheService', '$timeout', function ($scope, $rootScope, itemCache, paginationCache, $timeout) {
            $scope.title = $scope.resource;
            $scope.changePage = function () {
                $rootScope.$emit('filter');
            };

            var delFilter = $rootScope.$on('filter', function () {
                if ($routeParams.searchId) {
                    filterService.filterAllResourcesById($routeParams.searchId);
                } else {
                    filterService.filterItems($scope.resource);
                }
            });

            $scope.$on('$destroy', function () {
                delFilter();
            });

            $scope.pagination = paginationCache.get($scope.resource);

            $rootScope.$emit('filter');
        }]
    };
}]);