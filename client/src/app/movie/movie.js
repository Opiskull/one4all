angular.module('data.movie', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movie/:searchId?', {
            templateUrl: 'movie/movie-list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }]);