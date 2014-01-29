angular.module('serie.resource', ['restangular'])
    .factory('Series',['Restangular',function(restangular){
        var Series = restangular.all('serie');
        return Series;
    }]);
