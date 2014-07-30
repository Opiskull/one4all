angular.module('anime')
    .factory('animeResource', ['Restangular', function (restangular) {
        var Animes = restangular.all('anime');
        return Animes;
    }]);
