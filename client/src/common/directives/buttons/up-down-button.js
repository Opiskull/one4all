angular.module('one4all').directive('upDownButton', [function () {
    return {
        templateUrl: 'directives/buttons/up-down-button.html',
        restrict: 'E',
        scope: {
            disabled: '=',
            item: '=',
            update: '&'
        },
        link: function ($scope, $element, $attr) {
            function decrease() {
                var value = $scope.item[$scope.property];
                if (value && value > 1) {
                    value -= 1;
                } else {
                    value = 0;
                }
                $scope.item[$scope.property] = value;
            }

            function increase() {
                var value = $scope.item[$scope.property];
                if (value && value > 0) {
                    value += 1;
                } else {
                    value = 1;
                }
                $scope.item[$scope.property] = value;
            }

            $scope.property = $scope.$eval($attr.property);
            $scope.decrease = function () {
                decrease();
                $scope.update();
            };
            $scope.increase = function () {
                increase();
                $scope.update();
            };
        }
    };
}]);