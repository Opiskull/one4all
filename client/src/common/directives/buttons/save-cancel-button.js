angular.module('one4all').directive('saveCancelButton', [function () {
    return {
        templateUrl:'directives/buttons/save-cancel-button.html',
        restrict: 'E',
        scope: {
            save: '&save',
            cancel: '&cancel'
        },
        link: function ($scope, $element, $attr) {
        }
    };
}]);