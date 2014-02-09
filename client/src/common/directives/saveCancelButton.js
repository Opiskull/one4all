angular.module('14all').directive('saveCancelButton', [function() {
    return {
        template:
            '<div class="btn-group btn-group-justified"> \
                <a class="btn btn-default" ng-click="save()">save</a> \
                <a class="btn btn-default" ng-click="cancel()">cancel</a> \
            </div>',
        restrict: 'E',
        scope: {
            save: '&save',
            cancel: '&cancel'
        },
        link : function($scope,$element,$attr){
        }
    };
}]);