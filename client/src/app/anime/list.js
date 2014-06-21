angular.module('anime')
    .controller('AnimeListCtrl', ['$scope', 'animeResource', 'itemService', 'searchDialogService', function ($scope, Animes, itemService, searchDialogService) {
        $scope.animes = Animes.items;
        $scope.itemService = itemService;

        $scope.search = function (item) {
            searchDialogService.search(item.title, 'mal-anime').then(function (result) {
                item.title = result.title;
                itemService.setInfo(item, result.info);
            });
        };

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

//        $scope.showInfo = function(item){
//            item.open = !!!item.open;
//        };

//        $scope.dropped = function(item){
//            itemService.dropped(item)
//        };

//        $scope.finished = function(anime){
//            itemService.finished(anime);
//        };

//        $scope.increaseEp = function(anime){
//            itemService.increaseEp(anime);
//        };
//
//        $scope.decreaseEp = function(anime){
//            itemService.decreaseEp(anime);
//        };
    }]);