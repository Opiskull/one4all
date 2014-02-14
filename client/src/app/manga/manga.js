angular.module('manga',['ngRoute','manga.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/list.html',
            controller: 'MangaListCtrl',
            authRequired: true
        });
    }])
    .controller('MangaListCtrl', ['$scope','Mangas','$location','$filter','valuesService', function ($scope,Mangas,$location,$filter,valuesService) {
        $scope.mangas = Mangas.items;
        $scope.dropped = function(item){
            valuesService.dropped(item)
        };
        $scope.remove = function(manga){
            valuesService.removeWithDlg('manga',$scope.mangas,manga);
        };

        $scope.update = function(manga){
            valuesService.update(manga).then(function(updated){
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
            valuesService.finished(manga);
        };

        $scope.increaseCh = function(manga){
            valuesService.increaseCh(manga);
        };

        $scope.decreaseCh = function(manga){
            valuesService.decreaseCh(manga);
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