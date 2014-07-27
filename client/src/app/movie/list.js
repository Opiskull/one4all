angular.module('movie')
    .controller('MovieListCtrl', ['$scope', 'movieResource', 'itemService','filterService', function ($scope, Movies, itemService,filterService) {
        filterService.register($scope,Movies);
        $scope.itemService = itemService;
        $scope.defaultProvider = 'tmdb-movie';
        $scope.enabledStats = ['finished'];

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