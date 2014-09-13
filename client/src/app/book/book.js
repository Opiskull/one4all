angular.module('book', ['core', 'ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/book', {
            templateUrl: 'book/book-list.html',
            controller: 'BookListCtrl',
            authRequired: true
        });
    }]);