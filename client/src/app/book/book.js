angular.module('data.book', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/book', {
            templateUrl: 'book/book-list.html',
            controller: 'BookListCtrl',
            authRequired: true
        });
    }]);