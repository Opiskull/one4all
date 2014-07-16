angular.module('book')
    .controller('BookListCtrl', ['$scope', 'bookResource', 'itemService', function ($scope, bookResource, itemService) {
        $scope.books = bookResource.items;
        $scope.itemService = itemService;
        $scope.defaultProvider = 'google-books';
        $scope.pagination = { currentPage : 1, itemsPerPage: 20, maxSize: 5};

        $scope.remove = function (book) {
            itemService.removeWithDlg('book', $scope.books, book);
        };

        $scope.update = function (book) {
            itemService.update(book).then(function (updated) {
                updated.editable = false;
            });
        };

        $scope.cancel = function (book) {
            if (book.isnew) {
                $scope.newbook = {};
            }
            book.editable = false;
        };

        $scope.add = function () {
            $scope.newbook = {isnew: true};
        };

        $scope.create = function (book) {
            bookResource.post(book).then(function (addedBook) {
                $scope.newbook = {};
                $scope.books.push(addedBook);
            }, function (response) {
                console.log("Error");
            });
        };
    }]);