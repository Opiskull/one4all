angular.module('anime')
    .controller('AnimeListCtrl', ['$scope', '$controller', 'animeResource', function ($scope, $controller, Animes) {
        $controller('BaseListCtrl', {$scope: $scope, Resource: Animes});
        $scope.defaultProvider = 'mal-anime';
        $scope.title = 'anime';
    }]);