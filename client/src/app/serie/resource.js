angular.module('serie')
    .factory('serieResource', ['Restangular', function (restangular) {
        var Series = restangular.all('serie');
        return Series;
    }]);
