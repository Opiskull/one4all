angular.module('book')
    .factory('bookResource', ['Restangular', function (restangular) {
        return restangular.all('book');
    }]);
