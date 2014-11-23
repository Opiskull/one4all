angular.module('data.serie', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/serie', {
            templateUrl: 'serie/serie-list.html',
            controller: 'SerieListCtrl',
            authRequired: true
        });
    }]);