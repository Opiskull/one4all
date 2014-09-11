angular.module('one4all').directive('displayState', [function () {
    return {
        restrict: 'A',
        scope: {
            state: '=displayState'
        },
        link: function ($scope, $element) {
            $scope.$watch('state', function (state) {
                if (angular.isDefined(state)) {
                    $element.toggleClass('finished', state === 'finished');
                    $element.toggleClass('dropped', state === 'dropped');
                    $element.toggleClass('paused', state === 'paused');
                }
            });
        }
    };
}]);