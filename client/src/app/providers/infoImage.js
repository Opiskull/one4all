angular.module('providers').directive('infoImage', [function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<img class="info-img" ng-src="{{info.img}}"/>',
        link: function (scope, element, attrs) {
        },
        scope: {
            info: '='
        }
    };
}]);