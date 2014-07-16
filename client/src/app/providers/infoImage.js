angular.module('providers').directive('infoImage', [function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<img class="info-img" ng-src="{{src}}"/>',
        link: function (scope, element, attrs) {
            if(scope.info.img){
                scope.src = scope.info.img;
            } else{
                scope.src = "no_image.jpg";
            }
        },
        scope: {
            info: '='
        }
    };
}]);