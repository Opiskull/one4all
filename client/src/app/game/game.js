angular.module('data.game', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game/:searchId?', {
            templateUrl: 'game/game-list.html',
            controller: 'GameListCtrl',
            authRequired: true
        });
    }]);