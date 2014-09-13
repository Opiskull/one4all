angular.module('book')
    .controller('BookListCtrl', ['$scope', '$controller', 'bookResource', function ($scope, $controller, bookResource) {
        $controller('BaseListCtrl', {$scope: $scope, Resource: bookResource});
        $scope.defaultProvider = 'google-books';
        $scope.title = 'book';
        $scope.searchInfoCallback = function (result) {
            if (result.info.authors)
                result.item.author = result.info.authors[0];
        }
    }]);