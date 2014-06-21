angular.module('manga')
    .factory('mangaResource', ['Restangular', function (restangular) {
        var Mangas = restangular.all('manga');
        Mangas.items = Mangas.getList().$object;
        return Mangas;
    }]);
