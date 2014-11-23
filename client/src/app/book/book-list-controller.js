angular.module('data.book')
    .controller('BookListCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('BaseListCtrl', {$scope: $scope, resourceName: 'book'});
        $scope.defaultProvider = 'google-books';
        $scope.searchInfoCallback = function (info, item) {
            if (info.info.authors)
                item.author = info.info.authors[0];
        }
    }]);