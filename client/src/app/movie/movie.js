angular.module('data.movie', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'movie/movie-list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }]);