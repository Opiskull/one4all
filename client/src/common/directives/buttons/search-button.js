angular.module('one4all').directive('searchButton', ['searchDialogService', 'itemService', function (searchDialogService, itemService) {
    return {
        templateUrl: 'directives/buttons/search-button.html' ,
        restrict: 'E',
        scope: {
            defaultProvider: '=',
            item: '=',
            infoCallback: '='
        },
        link: function ($scope, $element, $attr) {
            $scope.placeholder = $attr.placeholder || '';
            $scope.search = function (item) {
                searchDialogService.search(item.title, $scope.defaultProvider).then(function (result) {
                    item.title = result.title;
                    if(angular.isFunction($scope.infoCallback)) {
                        result.item = item;
                        $scope.infoCallback(result);
                    }
                    itemService.setInfo(item, result.info);
                });
            };

        }
    };
}]);