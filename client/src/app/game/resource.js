angular.module('game')
    .factory('gameResource', ['Restangular', function (restangular) {
        var Games = restangular.all('game');
        return Games;
    }]);
