angular.module('movie')
    .controller('MovieListCtrl', ['$scope', '$controller', 'movieResource', function ($scope, $controller, Movies) {
        $controller('BaseListCtrl', {$scope: $scope, Resource: Movies});
        $scope.defaultProvider = 'tmdb-movie';
        $scope.enabledStats = ['finished'];
        $scope.title = 'movie';
    }]);