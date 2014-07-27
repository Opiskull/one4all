angular.module('anime')
    .controller('AnimeListCtrl', ['$scope', 'animeResource', 'itemService', 'filterService', function ($scope, Animes, itemService, filterService) {
        filterService.register($scope,Animes);

        $scope.itemService = itemService;
        $scope.defaultProvider = 'mal-anime';

        $scope.remove = function (anime) {
            itemService.removeWithDlg('anime', $scope.items, anime);
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
                $scope.items.push(addedAnime);
            }, function (response) {
                console.log("Error");
            });
        };
    }]);