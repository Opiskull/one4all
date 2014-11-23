angular.module('one4all').directive('searchButton', [function () {
    return {
        templateUrl: 'directives/search-button/search-button.html',
        restrict: 'E',
        scope: {
            defaultProvider: '=',
            item: '=',
            infoCallback: '&'
        },
        link: function ($scope, $element, $attr) {
            $scope.placeholder = $attr.placeholder || '';
        },
        controller: ['$scope', 'searchDialogService', 'itemService', function ($scope, searchDialogService, itemService) {
            $scope.search = function (item) {
                searchDialogService.search(item.title, $scope.defaultProvider).then(function (info) {
                    item.title = info.title;
                    itemService.setInfo(item, info.info);
                    $scope.infoCallback({
                        info: info,
                        item: item
                    });
                });
            };
        }]
    };
}]);