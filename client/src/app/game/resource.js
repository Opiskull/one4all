angular.module('game')
    .factory('gameResource',['Restangular',function(restangular){
        var Games = restangular.all('game');
        Games.items = Games.getList().$object;
        return Games;
    }]);
