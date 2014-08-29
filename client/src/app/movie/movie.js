angular.module('movie', ['ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'movie/movie-list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }]);