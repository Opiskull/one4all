angular.module('providers').directive('infoImage', [function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<img bindonce class="info-img" bo-src="info.img"/>',
        link: function (scope, element, attrs) {
        },
        scope: {
            info: '='
        }
    };
}]);