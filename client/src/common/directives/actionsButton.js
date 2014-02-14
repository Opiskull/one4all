angular.module('14all').directive('actionsButton', [function() {
    return {
        template:
            '<div class="btn-group pull-right"> \
                <a class="btn btn-default" ng-class="{active:model.finished}" href="" ng-click="finished()" title="finished"><i class="glyphicon glyphicon-ok"></i></a>\
                <a class="btn btn-default" ng-class="{active:model.dropped}" href="" ng-click="dropped()" title="dropped"><i class="glyphicon glyphicon-ban-circle"></i></a>\
                <a class="btn btn-default" ng-model="model.editable" btn-checkbox href=""  title="edit"><i class="glyphicon glyphicon-pencil"></i></a>\
                <a class="btn btn-default" ng-click="remove()" href=""  title="delete"><i class="glyphicon glyphicon-trash"></i></a>\
            </div>',
        restrict: 'E',
        scope: {
            model: '=model',
            finished: '&finished',
            remove: '&remove',
            dropped: '&dropped'
        },
        link : function($scope,$element,$attr){
        }
    };
}]);