angular.module('game.resource', ['restangular'])
    .factory('Games',['Restangular',function(restangular){
        var Games = restangular.all('game');
        Games.items = Games.getList().$object;
        return Games;
    }]);
