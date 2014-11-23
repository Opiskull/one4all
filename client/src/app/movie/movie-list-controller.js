angular.module('data.movie')
    .controller('MovieListCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('BaseListCtrl', {$scope: $scope, resourceName: 'movie'});
        $scope.defaultProvider = 'tmdb-movie';
        $scope.enabledStats = ['finished'];
    }]);