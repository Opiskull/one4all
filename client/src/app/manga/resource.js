angular.module('manga')
    .factory('mangaResource', ['Restangular', function (restangular) {
        return restangular.all('manga');
    }]);
