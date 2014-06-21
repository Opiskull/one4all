angular.module('serie')
    .factory('serieResource', ['Restangular', function (restangular) {
        var Series = restangular.all('serie');
        Series.items = Series.getList().$object;
        return Series;
    }]);
