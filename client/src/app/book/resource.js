angular.module('book')
    .factory('bookResource', ['Restangular', function (restangular) {
        var Books = restangular.all('book');
        return Books;
    }]);
