angular.module('14all', ['ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'auth',
    /* Modules */
    'manga', 'movie', 'serie', 'anime', 'game', 'book',
    'providers',
    '14all.templates',
    'pasvaz.bindonce'])
    .config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
    }])
    .controller('AppCtrl', ['$scope', 'authService', 'settingsService', '$rootScope','$timeout', function ($scope, authService, settingsService, $rootScope, $timeout) {
        $scope.authInfo = authService.authInfo;
        $scope.logout = authService.logout;
        $scope.settings = settingsService.settings;
        $scope.orderBy = $scope.settings.orderBy;
        $scope.keyword = '';
        $scope.appInfo = appInfo;

        $scope.focus = {search: true};

        $scope.clearKeyword = function () {
            $scope.keyword = '';
        };

        $scope.filterItems = function () {
            $timeout(function(){
                $rootScope.$emit('filter');
            });
        };

        $scope.$watch('keyword', _.debounce(function (newValue) {
            $scope.$apply(function () {
                settingsService.settings.filters.keyword = newValue;
                $scope.filterItems();
            });
        }, 250));

        $scope.$on("$routeChangeStart", function (event, next, current) {
            $scope.focus.search = false;
        });

        $scope.$on("$routeChangeSuccess", function (event, next, current) {
            $scope.focus.search = true;
            $scope.keyword = '';
        });
    }]);


