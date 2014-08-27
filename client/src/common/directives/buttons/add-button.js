angular.module('one4all').directive('addButton', [function () {
    return {
        template: '<button ng-click="add()" class="btn btn-default"><i class="glyphicon glyphicon-plus"></i></button>',
        restrict: 'E',
        replace: true,
        scope: {
            add: '&add'
        },
        link: function ($scope, $element, $attr) {
        }
    };
}]);