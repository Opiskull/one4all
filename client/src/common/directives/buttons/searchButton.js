angular.module('14all').directive('searchButton', [function() {
    return {
        template:
            '<div class="input-group"> \
                <input class="form-control input-sm" type="text" ng-model="item.title"/> \
                <span class="input-group-btn"> \
                    <button class="btn btn-default btn-sm" type="button" ng-click="search(item)"> \
                        <span class="glyphicon glyphicon-transfer"></span> \
                    </button> \
                </span> \
            </div>',
        restrict: 'E',
        scope: {
            search: '&search',
            item: '='
        },
        link : function($scope,$element,$attr){
        }
    };
}]);