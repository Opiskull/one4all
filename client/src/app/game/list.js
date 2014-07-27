angular.module('game')
    .controller('GameListCtrl', ['$scope', 'gameResource', 'itemService','filterService', function ($scope, Games, itemService, filterService) {
        filterService.register($scope, Games);
        $scope.itemService = itemService;
        $scope.defaultProvider = '';

        $scope.remove = function (game) {
            itemService.removeWithDlg('game', $scope.games, game);
        };

        $scope.update = function (game) {
            itemService.update(game).then(function (updated) {
                updated.editable = false;
            });
        };

        $scope.cancel = function (game) {
            if (game.isnew) {
                $scope.newgame = {};
            }
            game.editable = false;
        };

        $scope.add = function () {
            $scope.newgame = {isnew: true};
        };

        $scope.create = function (game) {
            Games.post(game).then(function (addedGame) {
                $scope.newgame = {};
                $scope.games.push(addedGame);
            }, function (response) {
                console.log("Error");
            });
        };
    }]);