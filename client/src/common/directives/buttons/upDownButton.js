angular.module('14all').directive('upDownButton', [function() {
    return {
        template:
            '<div class="input-group" style="width: 115px"> \
                <a ng-click="decrease()" class="btn btn-default" ng-disabled="disabled" title="decrease"><i class="glyphicon glyphicon-minus"></i></a> \
                <div class="middle-vertical text-right" style="width:35px">{{value}}</div> \
                <a ng-click="increase()" class="btn btn-default" ng-disabled="disabled" title="increase"><i class="glyphicon glyphicon-plus"></i></a> \
            </div>',
        restrict: 'E',
        scope: {
            decrease: '&decrease',
            increase: '&increase',
            value: '=value',
            disabled: '=disabled'
        },
        link : function($scope,$element,$attr){
        }
    };
}]);