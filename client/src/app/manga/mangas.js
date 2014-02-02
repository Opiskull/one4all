angular.module('manga.resource', ['restangular'])
    .factory('Mangas',['Restangular',function(restangular){
        var Mangas = restangular.all('manga');
        Mangas.items = Mangas.getList().$object;
        return Mangas;
    }]);
