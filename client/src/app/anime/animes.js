angular.module('anime.resource', ['restangular'])
    .factory('Animes',['Restangular',function(restangular){
        var Animes = restangular.all('anime');
        return Animes;
    }]);
