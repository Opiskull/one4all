angular.module('game')
    .controller('GameListCtrl', ['$scope', '$controller', 'gameResource', function ($scope, $controller, Games) {
        $controller('BaseListCtrl', {$scope: $scope, Resource: Games});
        $scope.defaultProvider = '';
        $scope.title = 'game';
    }]);