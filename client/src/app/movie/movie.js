angular.module('movie',['ngRoute','movie.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'movie/list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }])
    .controller('MovieListCtrl', ['$scope','Movies','$location','$filter','valuesService', function ($scope,Movies,$location,$filter,valuesService) {
        $scope.movies = Movies.items;

        $scope.remove = function(movie){
            valuesService.removeWithDlg('movie',$scope.movies,movie);
        };

        $scope.update = function(movie){
            valuesService.update(movie).then(function(updated){
                updated.editable = false;
            });
        };

        $scope.cancel = function(movie){
            if(movie.isnew){
                $scope.newmovie= {};
            }
            movie.editable = false;
        };

        $scope.add = function(){
            $scope.newmovie = {isnew:true};
        };

        $scope.create = function(movie){
            Movies.post(movie).then(function(addedMovie){
                $scope.newmovie = {};
                $scope.movies.push(addedMovie);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(movie){
            valuesService.finished(movie);
        };
    }]);