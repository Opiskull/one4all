angular.module('manga')
    .controller('MangaListCtrl', ['$scope','mangaResource','$location','$filter','itemService','searchDialogService', function ($scope,Mangas,$location,$filter,itemService,searchDialogService) {
        $scope.mangas = Mangas.items;
        $scope.itemService = itemService;

        $scope.search = function(item){
            searchDialogService.search(item.title,'mal-manga').then(function(result){
                item.title = result.title;
                itemService.setInfo(item, result.info);
            });
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