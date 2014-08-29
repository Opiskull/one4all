angular.module('game', ['ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/game-list.html',
            controller: 'GameListCtrl',
            authRequired: true
        });
    }]);