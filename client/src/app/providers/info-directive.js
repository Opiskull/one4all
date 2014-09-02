angular.module('providers').directive('info', ['searchService', function (searchService) {
    return {
        restrict: 'E',
        template: '<div ng-if="item.open"><div ng-include="detailTemplate" ng-if="info"></div><tags items="item.tags"></tags></div>',
        link: function (scope, element, attrs) {
            if (scope.item.info) {
                var provider = searchService.getProvider(scope.item.info.provider);
                scope.detailTemplate = provider.detailUrl;
                scope.info = scope.item.info;
            }
        },
        scope: {
            item: '='
        }
    };
}]);