angular.module('anime')
    .controller('AnimeListCtrl', ['$scope', 'animeResource', 'filterService', 'listService', function ($scope, Animes, filterService, listService) {
        filterService.register($scope, Animes);
        listService.register($scope, Animes);
        $scope.defaultProvider = 'mal-anime';
        $scope.title = 'anime';
    }]);