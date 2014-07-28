/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('timeAgo', ['$window', function ($window) {
    return function (value) {
        return $window.moment(value).fromNow();
    }
}]).directive('timeAgo', ['$window', function ($window) {
    return{
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe("timeAgo", function () {
                element.text($window.moment(scope.$eval(attrs.timeAgo)).fromNow());
            });
        }
    };
}]);