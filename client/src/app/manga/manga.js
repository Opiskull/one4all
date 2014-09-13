angular.module('manga', ['core', 'ngRoute', 'restangular'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/manga-list.html',
            controller: 'MangaListCtrl',
            authRequired: true
        });
    }]);