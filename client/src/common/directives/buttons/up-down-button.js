angular.module('one4all').directive('upDownButton', ['itemService', function (itemService) {
    return {
        templateUrl: 'directives/buttons/up-down-button.html',
        restrict: 'E',
        scope: {
            disabled: '=',
            item: '='
        },
        link: function ($scope, $element, $attr) {
            $scope.property = $scope.$eval($attr.property);
            $scope.decrease = function () {
                itemService.decreaseProperty($scope.item, $scope.property);
            };
            $scope.increase = function () {
                itemService.increaseProperty($scope.item, $scope.property);
            };
        }
    };
}]);