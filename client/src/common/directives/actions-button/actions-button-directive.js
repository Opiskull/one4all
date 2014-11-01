angular.module('one4all').directive('actionsButton', [function () {
    return {
        templateUrl: 'directives/actions-button/actions-button.html',
        restrict: 'E',
        scope: {
            edit: '&edit',
            remove: '&remove'
        },
        link: function ($scope, $element, $attr) {

        }
    };
}]);