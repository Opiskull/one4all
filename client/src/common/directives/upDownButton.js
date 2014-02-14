angular.module('14all').directive('upDownButton', [function() {
    return {
        template:
            '<div class="input-group"> \
                <a href="" ng-click="decrease()" class="btn btn-default input-group-btn" ng-disabled="disabled" title="decrease"><i class="glyphicon glyphicon-minus"></i></a> \
                <div class="middle-vertical text-right">{{value}}</div> \
                <a href="" ng-click="increase()" class="btn btn-default input-group-btn" ng-disabled="disabled" title="increase"><i class="glyphicon glyphicon-plus"></i></a> \
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