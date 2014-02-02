angular.module('movie.resource', ['restangular'])
    .factory('Movies',['Restangular',function(restangular){
        var Movies = restangular.all('movie');
        Movies.items = Movies.getList().$object;
        return Movies;
    }]);
