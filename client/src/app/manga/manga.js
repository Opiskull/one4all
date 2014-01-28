angular.module('manga',['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/manga', {
            templateUrl: 'manga/list.html',
            controller: 'MangaListCtrl',
            needsAuth: true
        })
            .otherwise('/manga');
    }])
    .controller('MangaListCtrl', ['$scope','Mangas','$location','$filter', function ($scope,Mangas,$location,$filter) {
        $scope.mangas = Mangas.getList().$object;;

        $scope.filtered = function(){
            var filtered = $scope.mangas;
            if($scope.hideFinished){
                filtered = $filter('filter')(filtered,function(value){return !value.finished;});
            }
            if($scope.search){
                filtered = $filter('filter')(filtered,$scope.search);
            }
            return filtered;
        };

        function removeManga(manga){
            $scope.mangas.splice($scope.mangas.indexOf(manga),1);
        }

        $scope.remove = function(manga){
            manga.remove().then(function(){
                removeManga(manga);
            });
        };

        $scope.update = function(manga){
            manga.put().then(function(updatedManga){
                manga.editable = false;
                manga.updatedAt = updatedManga.updatedAt
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
            manga.finished = !manga.finished;
            manga.put().then(function(updatedManga){
                manga.updatedAt = updatedManga.updatedAt
            });
        };

        $scope.increase = function(manga){
            manga.chapter +=1;
            manga.put().then(function(updatedManga){
                manga.updatedAt = updatedManga.updatedAt
            });
        };

        $scope.decrease = function(manga){
            manga.chapter -=1;
            manga.put().then(function(updatedManga){
                manga.updatedAt = updatedManga.updatedAt;
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