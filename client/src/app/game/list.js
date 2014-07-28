angular.module('game')
    .controller('GameListCtrl', ['$scope', 'gameResource', 'filterService', 'listService', function ($scope, Games, filterService, listService) {
        filterService.register($scope, Games);
        listService.register($scope, Animes);
        $scope.defaultProvider = '';
        $scope.title = 'game';
    }]);