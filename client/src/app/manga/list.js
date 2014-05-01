angular.module('manga')
    .controller('MangaListCtrl', ['$scope','mangaResource','$location','$filter','itemService', function ($scope,Mangas,$location,$filter,itemService) {
        $scope.mangas = Mangas.items;
        $scope.itemService = itemService;
        $scope.dropped = function(item){
            itemService.dropped(item)
        };
        $scope.remove = function(manga){
            itemService.removeWithDlg('manga',$scope.mangas,manga);
        };

        $scope.update = function(manga){
            itemService.update(manga).then(function(updated){
                updated.editable = false;
            });
        };

        $scope.cancel = function(manga){
            if(manga.isnew){
                $scope.newmanga= {};
            }
            manga.editable = false;
        };

        $scope.add = function(){
            $scope.newmanga = {isnew:true};
        };

        $scope.create = function(manga){
            Mangas.post(manga).then(function(addedManga){
                $scope.newmanga = {};
                $scope.mangas.push(addedManga);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(manga){
            itemService.finished(manga);
        };

        $scope.increaseCh = function(manga){
            itemService.increaseCh(manga);
        };

        $scope.decreaseCh = function(manga){
            itemService.decreaseCh(manga);
        };

        $scope.getNextChapterUrl = function(manga){
            if(manga.finished)
                return "";
            var url = manga.url;
            var chapter = manga.chapter + 1;
            if(url)
                return url.replace("$$chapter$$",chapter);
            else
                return "";
        }
    }]);