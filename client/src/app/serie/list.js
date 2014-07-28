angular.module('serie')
    .controller('SerieListCtrl', ['$scope', 'serieResource', 'filterService', 'listService', function ($scope, Series, filterService, listService) {
        filterService.register($scope, Series);
        listService.register($scope, Series);
        $scope.defaultProvider = 'tmdb-serie';
        $scope.title = 'serie';
    }]);