angular.module('providers').directive('selectTitle', [function () {
    return {
        restrict: 'E',
        templateUrl: 'providers/select-title.html',
        replace: true,
        link: function (scope, element, attrs) {
        }
    };
}]);