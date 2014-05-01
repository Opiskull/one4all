angular.module('anime', ['ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/anime', {
            templateUrl: 'anime/list.html',
            controller: 'AnimeListCtrl',
            authRequired: true
        });
    }]);