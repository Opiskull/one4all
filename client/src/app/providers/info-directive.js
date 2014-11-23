angular.module('providers').directive('info', ['searchService', function (searchService) {
    return {
        restrict: 'E',
        templateUrl: 'providers/info.html',
        link: function (scope, element, attrs) {
        },
        controller: ['$scope', 'searchService', function ($scope, searchService) {
            $scope.$watch('item.info', function (newInfo) {
                if (newInfo) {
                    var provider = searchService.getProvider(newInfo.provider);
                    $scope.detailTemplate = provider.detailUrl;
                    $scope.info = newInfo;
                }
            });
        }],
        scope: {
            item: '='
        }
    };
}]);