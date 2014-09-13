angular.module('one4all').directive('bottomPagination', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'directives/bottom-pagination.html',
        link: function (scope, element, attrs) {
            scope.changePage = function () {
                $rootScope.$emit('filter');
            };
        }
    };
}]);