angular.module('14all').directive('searchButton', ['searchDialogService','itemService',function(searchDialogService,itemService) {
    return {
        template:
            '<div class="input-group"> \
                <input class="form-control input-sm" type="text" ng-model="item.title" focus-me="item.isnew"/> \
                <span class="input-group-btn"> \
                    <button class="btn btn-default btn-sm" type="button" ng-click="search(item)"> \
                        <span class="glyphicon glyphicon-transfer"></span> \
                    </button> \
                </span> \
            </div>',
        restrict: 'E',
        scope: {
            defaultProvider: '=',
            item: '='
        },
        link : function($scope,$element,$attr){
            $scope.search = function (item) {
                searchDialogService.search(item.title, $scope.defaultProvider).then(function (result) {
                    item.title = result.title;
                    itemService.setInfo(item, result.info);
                });
            };
        }
    };
}]);