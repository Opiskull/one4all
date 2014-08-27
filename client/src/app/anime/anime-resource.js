angular.module('anime')
    .factory('animeResource', ['Restangular', function (restangular) {
        return restangular.all('anime');
    }]);
