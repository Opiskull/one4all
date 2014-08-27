angular.module('movie')
    .factory('movieResource', ['Restangular', function (restangular) {
        return restangular.all('movie');
    }]);
