angular.module('data.anime')
    .controller('AnimeListCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('BaseListCtrl', {$scope: $scope, resourceName: 'anime'});
        $scope.defaultProvider = 'mal-anime'
    }]);