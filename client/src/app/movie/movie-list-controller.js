angular.module('movie')
    .controller('MovieListCtrl', ['$scope', 'movieResource', 'filterService', 'listService', function ($scope, Movies, filterService, listService) {
        filterService.register($scope, Movies);
        listService.register($scope, Movies);
        $scope.defaultProvider = 'tmdb-movie';
        $scope.enabledStats = ['finished'];
        $scope.title = 'movie';
    }]);