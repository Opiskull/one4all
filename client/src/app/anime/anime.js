angular.module('anime', ['core', 'ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/anime', {
            templateUrl: 'anime/anime-list.html',
            controller: 'AnimeListCtrl',
            authRequired: true
        });
    }]);