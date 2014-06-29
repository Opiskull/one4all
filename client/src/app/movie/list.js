angular.module('movie')
    .controller('MovieListCtrl', ['$scope', 'movieResource', '$location', '$filter', 'itemService', 'searchDialogService', function ($scope, Movies, $location, $filter, itemService, searchDialogService) {
        $scope.movies = Movies.items;
        $scope.itemService = itemService;
        $scope.defaultProvider = 'tmdb-movie';

        $scope.remove = function (movie) {
            itemService.removeWithDlg('movie', $scope.movies, movie);
        };

        $scope.update = function (movie) {
            itemService.update(movie).then(function (updated) {
                updated.editable = false;
            });
        };

        $scope.cancel = function (movie) {
            if (movie.isnew) {
                $scope.newmovie = {};
            }
            movie.editable = false;
        };

        $scope.add = function () {
            $scope.newmovie = {isnew: true};
        };

        $scope.create = function (movie) {
            Movies.post(movie).then(function (addedMovie) {
                $scope.newmovie = {};
                $scope.movies.push(addedMovie);
            }, function (response) {
                console.log("Error");
            });
        };
    }]);