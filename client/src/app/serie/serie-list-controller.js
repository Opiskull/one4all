angular.module('serie')
    .controller('SerieListCtrl', ['$scope', '$controller', 'serieResource', function ($scope, $controller, Series) {
        $controller('BaseListCtrl', {$scope: $scope, Resource: Series});
        $scope.defaultProvider = 'tmdb-serie';
        $scope.title = 'serie';
    }]);