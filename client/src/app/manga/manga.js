angular.module('data.manga', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manga/:searchId?', {
            templateUrl: 'manga/manga-list.html',
            controller: 'MangaListCtrl',
            authRequired: true
        });
    }]);