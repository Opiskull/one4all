angular.module('book',['ngRoute','restangular'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/book', {
            templateUrl: 'book/list.html',
            controller: 'BookListCtrl',
            authRequired: true
        });
    }]);