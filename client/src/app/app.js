angular.module('one4all', ['ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'ngStorage',
    'auth',
    'core',
    /* Modules */
    'manga', 'movie', 'serie', 'anime', 'game', 'book',
    'providers',
    'dialog',
    'one4all.templates',
    'pasvaz.bindonce'])
    .config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    }])
    .controller('AppCtrl', ['$scope', 'authService', 'settingsService', '$rootScope', '$timeout', function ($scope, authService, settingsService, $rootScope, $timeout) {
        $scope.authInfo = authService.authInfo;
        $scope.logout = authService.logout;
        $scope.settings = settingsService.settings;
        $scope.orderBy = $scope.settings.orderBy;

        $scope.appInfo = appInfo;

        $scope.focus = {search: true};

        $scope.$on("$routeChangeStart", function (event, next, current) {
            $scope.focus.search = false;
        });

        $scope.$on("$routeChangeSuccess", function (event, next, current) {
            $scope.focus.search = true;
        });
    }]);


