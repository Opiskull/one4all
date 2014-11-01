angular.module('one4all').directive('navBar', [function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'directives/nav-bar/nav-bar.html',
        link: function (scope, element, attrs) {
        },
        controller: ['$scope', 'appInfoService', 'authService', 'settingsService', function ($scope, appInfoService, authService, settingsService) {
            $scope.appInfo = appInfoService;
            $scope.collapsed = {};
            $scope.authInfo = authService.authInfo;
            $scope.logout = authService.logout;
            $scope.settings = settingsService.settings;
            $scope.orderBy = $scope.settings.orderBy;
            $scope.focus = {search: true};

            $scope.$on("$routeChangeStart", function (event, next, current) {
                $scope.focus.search = false;
            });

            $scope.$on("$routeChangeSuccess", function (event, next, current) {
                $scope.focus.search = true;
            });
        }]
    };
}]);