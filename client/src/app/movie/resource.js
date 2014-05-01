angular.module('movie')
    .factory('movieResource',['Restangular',function(restangular){
        var Movies = restangular.all('movie');
        Movies.items = Movies.getList().$object;
        return Movies;
    }]);
