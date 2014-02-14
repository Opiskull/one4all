angular.module('game',['ngRoute','game.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/list.html',
            controller: 'GameListCtrl',
            authRequired: true
        });
    }])
    .controller('GameListCtrl', ['$scope','Games','$location','$filter','valuesService', function ($scope,Games,$location,$filter,valuesService) {
        $scope.games = Games.items;
        $scope.dropped = function(item){
            valuesService.dropped(item)
        };
        $scope.remove = function(game){
            valuesService.removeWithDlg('game',$scope.games,game);
        };

        $scope.update = function(game){
            valuesService.update(game).then(function(updated){
                updated.editable = false;
            });
        };

        $scope.cancel = function(game){
            if(game.isnew){
                $scope.newgame= {};
            }
            game.editable = false;
        };

        $scope.add = function(){
            $scope.newgame = {isnew:true};
        };

        $scope.create = function(game){
            Games.post(game).then(function(addedGame){
                $scope.newgame = {};
                $scope.games.push(addedGame);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(game){
            valuesService.finished(game);
        };
    }]);