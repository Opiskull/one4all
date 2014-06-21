angular.module('providers').directive('info', ['searchService', function (searchService) {
    return {
        restrict: 'E',
        template: '<div ng-include="detailTemplate" ng-if="info"></div>',
        link: function (scope, element, attrs) {
            if (scope.info) {
                var provider = searchService.getProvider(scope.info.provider)
                scope.detailTemplate = provider.detailUrl;
            }
        },
        scope: {
            info: '='
        }
    };
}]);