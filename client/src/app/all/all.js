angular.module('data.all', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/all', {
            templateUrl: 'all/all.html',
            controller: 'AllListCtrl',
            authRequired: true
        });
    }]);