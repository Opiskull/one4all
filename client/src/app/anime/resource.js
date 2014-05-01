angular.module('anime')
    .factory('animeResource',['Restangular',function(restangular){
        var Animes = restangular.all('anime');
        Animes.items = Animes.getList().$object;
        return Animes;
    }]);
