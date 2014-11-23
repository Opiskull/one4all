angular.module('data.manga')
    .controller('MangaListCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('BaseListCtrl', {$scope: $scope, resourceName: 'manga'});
        $scope.defaultProvider = 'mal-manga';

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