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
    'pasvaz.bindonce',
    'angular-growl'])
    .config(['RestangularProvider','$compileProvider','growlProvider', function (RestangularProvider,$compileProvider,growlProvider) {
        $compileProvider.debugInfoEnabled(true);
        RestangularProvider.setBaseUrl('/api');
        growlProvider.globalPosition('bottom-right');
        growlProvider.globalDisableIcons(true);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({success: 2000, error: -1, warning: 3000, info: 4000});
    }])
    .controller('AppCtrl', ['$scope', 'authService', 'settingsService', function ($scope, authService, settingsService) {
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


