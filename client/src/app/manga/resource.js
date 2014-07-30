angular.module('manga')
    .factory('mangaResource', ['Restangular', function (restangular) {
        var Mangas = restangular.all('manga');
        return Mangas;
    }]);
