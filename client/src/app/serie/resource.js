angular.module('serie')
    .factory('serieResource', ['Restangular', function (restangular) {
        return restangular.all('serie');
    }]);
