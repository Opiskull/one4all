angular.module('data.anime', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/anime/:searchId?', {
            templateUrl: 'anime/anime-list.html',
            controller: 'AnimeListCtrl',
            authRequired: true
        });
    }]);