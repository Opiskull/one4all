angular.module('data.manga', ['core', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/manga-list.html',
            controller: 'MangaListCtrl',
            authRequired: true
        });
    }]);