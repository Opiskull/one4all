angular.module('one4all').directive('addButton', [function () {
    return {
        template: '<button ng-click="add()" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Add item</button>',
        restrict: 'E',
        scope: {
            add: '&add'
        },
        link: function ($scope, $element, $attr) {
        }
    };
}]);