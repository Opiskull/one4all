angular.module('data.serie')
    .controller('SerieListCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('BaseListCtrl', {$scope: $scope, resourceName: 'serie'});
        $scope.defaultProvider = 'tmdb-serie';
    }]);