angular.module('one4all').directive('saveCancelButton', [function () {
    return {
        template: '<div class="btn-group pull-right"> \
                <a class="btn btn-default" ng-click="save()" title="save"><i class="glyphicon glyphicon-floppy-disk"></i></a> \
                <a class="btn btn-default" ng-click="cancel()"  title="cancel"><i class="glyphicon glyphicon-floppy-remove"></i></a> \
            </div>',
        restrict: 'E',
        scope: {
            save: '&save',
            cancel: '&cancel'
        },
        link: function ($scope, $element, $attr) {
        }
    };
}]);