angular.module('manga')
    .controller('MangaListCtrl', ['$scope', 'mangaResource', 'filterService', 'listService', function ($scope, Mangas, filterService, listService) {
        filterService.register($scope, Mangas);
        listService.register($scope, Mangas);
        $scope.defaultProvider = 'mal-manga';
        $scope.title = 'manga';

        $scope.getNextChapterUrl = function (manga) {
            if (manga.finished)
                return "";
            var url = manga.url;
            var chapter = manga.chapter + 1;
            if (url)
                return url.replace("$$chapter$$", chapter);
            else
                return "";
        }
    }]);