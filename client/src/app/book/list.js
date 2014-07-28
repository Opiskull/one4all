angular.module('book')
    .controller('BookListCtrl', ['$scope', 'bookResource', 'filterService', 'listService', function ($scope, bookResource, filterService, listService) {
        filterService.register($scope, bookResource);
        listService.register($scope, bookResource);
        $scope.defaultProvider = 'google-books';
        $scope.title = 'book';
    }]);