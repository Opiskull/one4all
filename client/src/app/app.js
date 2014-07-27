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
    .controller('AppCtrl', ['$scope', '$location', 'authService', 'settingsService','$rootScope', function ($scope, $location, authService, settingsService, $rootScope) {
        $scope.authInfo = authService.authInfo;
        $scope.logout = authService.logout;
        $scope.settings = settingsService.settings;
        $scope.orderBy = $scope.settings.orderBy;
        $scope.keyword = '';

        $scope.focus = {search: true};

        $scope.clearKeyword = function(){
            $scope.keyword = '';
        };

        $scope.filterItems = function(){
            $rootScope.$emit('filter');
        };

        $scope.$watch('keyword', _.debounce(function(newValue){
            $scope.$apply(function(){
                settingsService.settings.filters.keyword = newValue;
                $rootScope.$emit('filter');
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


