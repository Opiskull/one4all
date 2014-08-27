angular.module('game')
    .factory('gameResource', ['Restangular', function (restangular) {
        return restangular.all('game');
    }]);
