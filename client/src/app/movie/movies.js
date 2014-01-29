angular.module('movie.resource', ['restangular'])
    .factory('Movies',['Restangular',function(restangular){
        var Movies = restangular.all('movie');
        return Movies;
    }]);
