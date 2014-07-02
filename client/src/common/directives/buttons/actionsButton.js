angular.module('14all').directive('actionsButton', ['itemService',function(itemService) {
    return {
        template:
            '<div class="btn-group pull-right"> \
                <a class="btn btn-default" ng-class="{active:item.stats.finished}" href="" ng-click="finished()" title="finished"><i class="glyphicon glyphicon-ok"></i></a>\
                <a class="btn btn-default" ng-class="{active:item.stats.dropped}" href="" ng-click="dropped()" title="dropped"><i class="glyphicon glyphicon-ban-circle"></i></a>\
                <a class="btn btn-default" ng-class="{active:item.stats.paused}" href="" ng-click="paused()" title="paused"><i class="glyphicon glyphicon-pause"></i></a>\
                <a class="btn btn-default" ng-model="item.editable" btn-checkbox href=""  title="edit"><i class="glyphicon glyphicon-pencil"></i></a>\
                <a class="btn btn-default" ng-click="remove()" href=""  title="delete"><i class="glyphicon glyphicon-trash"></i></a>\
            </div>',
        restrict: 'E',
        scope: {
            item: '=model',
            remove: '&remove'
        },
        link : function($scope,$element,$attr){
            $scope.finished = function(){
                itemService.finished($scope.item);
            };
            $scope.dropped = function(){
                itemService.dropped($scope.item);
            };
            $scope.paused = function(){
                itemService.paused($scope.item);
            }
        }
    };
}]);