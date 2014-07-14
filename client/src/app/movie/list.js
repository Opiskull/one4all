angular.module('movie')
    .controller('MovieListCtrl', ['$scope', 'movieResource', 'itemService', function ($scope, Movies, itemService) {
        $scope.movies = Movies.items;
        $scope.itemService = itemService;
        $scope.defaultProvider = 'tmdb-movie';
        $scope.enabledStats = ['finished'];
        $scope.pagination = { currentPage : 1, itemsPerPage: 20, maxSize: 5};

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