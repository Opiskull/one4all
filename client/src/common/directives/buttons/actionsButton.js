angular.module('14all').directive('actionsButton', ['itemService',function(itemService) {
    return {
        template:
            '<div class="btn-group pull-right"> \
                <a class="btn btn-default" ng-model="item.editable" btn-checkbox title="edit"><i class="glyphicon glyphicon-pencil"></i></a>\
                <a class="btn btn-default" ng-click="remove()" title="delete"><i class="glyphicon glyphicon-trash"></i></a>\
            </div>',
        restrict: 'E',
        scope: {
            item: '=model',
            remove: '&remove'
        },
        link : function($scope,$element,$attr){
        }
    };
}]);