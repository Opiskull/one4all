angular.module('manga')
    .controller('MangaListCtrl', ['$scope', '$controller', 'mangaResource', function ($scope, $controller, Mangas) {
        $controller('BaseListCtrl', {$scope: $scope, Resource: Mangas});
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