angular.module('one4all').directive('searchButton', ['searchDialogService', 'itemService', function (searchDialogService, itemService) {
    return {
        template: '<div class="input-group"> \
                <input class="form-control input-sm" type="text" ng-model="item.title" focus-me="true" placeholder="{{::placeholder}}"/> \
                <span class="input-group-btn"> \
                    <button class="btn btn-default btn-sm" type="button" ng-click="search(item)"> \
                        <span class="glyphicon glyphicon-transfer"></span> \
                    </button> \
                </span> \
            </div>',
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