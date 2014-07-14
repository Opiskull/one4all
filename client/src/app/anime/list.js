angular.module('anime')
    .controller('AnimeListCtrl', ['$scope', 'animeResource', 'itemService', function ($scope, Animes, itemService) {
        $scope.animes = Animes.items;
        $scope.itemService = itemService;
        $scope.defaultProvider = 'mal-anime';
        $scope.pagination = { currentPage : 1, itemsPerPage: 20, maxSize: 5};

        $scope.remove = function (anime) {
            itemService.removeWithDlg('anime', $scope.animes, anime);
        };

        $scope.update = function (anime) {
            itemService.update(anime).then(function (updated) {
                updated.editable = false;
            });
        };

        $scope.cancel = function (anime) {
            if (anime.isnew) {
                $scope.newanime = {};
            }
            anime.editable = false;
        };

        $scope.add = function () {
            $scope.newanime = {isnew: true};
        };

        $scope.create = function (anime) {
            Animes.post(anime).then(function (addedAnime) {
                $scope.newanime = {};
                $scope.animes.push(addedAnime);
            }, function (response) {
                console.log("Error");
            });
        };
    }]);