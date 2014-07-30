angular.module('movie')
    .factory('movieResource', ['Restangular', function (restangular) {
        var Movies = restangular.all('movie');
        return Movies;
    }]);
