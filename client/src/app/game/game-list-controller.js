angular.module('data.game')
    .controller('GameListCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('BaseListCtrl', {$scope: $scope, resourceName: 'game'});
        $scope.defaultProvider = '';
    }]);