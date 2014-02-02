angular.module('anime.resource', ['restangular'])
    .factory('Animes',['Restangular',function(restangular){
        var Animes = restangular.all('anime');
        Animes.items = Animes.getList().$object;
        return Animes;
    }]);
