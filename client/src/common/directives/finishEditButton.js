angular.module('14all').directive('finishEditButton', [function() {
    return {
        template:
            '<div class="btn-group pull-right"> \
    <a class="btn btn-default" ng-class="{active:model.finished}" href="" ng-click="finished()"><i class="glyphicon glyphicon-ok"></i></a>\
    <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle"><i class="glyphicon glyphicon-chevron-down"></i></button>\
        <ul class="dropdown-menu" role="menu">\
            <li><a ng-model="model.editable" btn-checkbox href=""><i class="glyphicon glyphicon-pencil"></i> edit</a></li>\
            <li><a ng-click="remove()" href=""><i class="glyphicon glyphicon-trash"></i> delete</a></li>\
        </ul>\
    </div>\
</div>',
        restrict: 'E',
        scope: {
            model: '=model',
            finished: '&finished',
            remove: '&remove'
        },
        link : function($scope,$element,$attr){
        }
    };
}]);