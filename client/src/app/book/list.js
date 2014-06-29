angular.module('book')
    .controller('BookListCtrl', ['$scope', 'bookResource', '$location', '$filter', 'itemService', function ($scope, bookResource, $location, $filter, itemService) {
        $scope.books = bookResource.items;
        $scope.itemService = itemService;
        $scope.defaultProvider = '';

        $scope.dropped = function (item) {
            itemService.dropped(item)
        };
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

        $scope.increasePg = function (manga) {
            itemService.increasePg(manga);
        };

        $scope.decreasePg = function (manga) {
            itemService.decreasePg(manga);
        };

        $scope.finished = function (book) {
            itemService.finished(book);
        };
    }]);