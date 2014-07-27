angular.module('14all').directive('upDownButton', ['itemService',function(itemService) {
    return {
        template:
            '<div class="input-group" style="width: 115px"> \
                <a ng-click="decrease()" class="btn btn-default" ng-disabled="disabled" title="decrease"><i class="glyphicon glyphicon-minus"></i></a> \
                <div class="middle-vertical text-right" style="width:35px">{{item[property]}}</div> \
                <a ng-click="increase()" class="btn btn-default" ng-disabled="disabled" title="increase"><i class="glyphicon glyphicon-plus"></i></a> \
            </div>',
        restrict: 'E',
        scope: {
            disabled: '=',
            item: '='
        },
        link : function($scope,$element,$attr){
            $scope.property = $scope.$eval($attr.property);
            $scope.decrease = function(){
                itemService.decProp($scope.item, $scope.property);
            };
            $scope.increase = function(){
                itemService.incProp($scope.item, $scope.property);
            };
        }
    };
}]);