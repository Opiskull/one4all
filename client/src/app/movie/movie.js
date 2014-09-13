angular.module('movie', ['core', 'ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'movie/movie-list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }]);