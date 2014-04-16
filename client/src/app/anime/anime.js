angular.module('anime',['ngRoute','anime.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/anime', {
            templateUrl: 'anime/list.html',
            controller: 'AnimeListCtrl',
            authRequired: true
        });
    }])
    .controller('AnimeListCtrl', ['$scope','Animes','$location','$filter','valuesService','searchDialogService', function ($scope,Animes,$location,$filter,valuesService,searchDialogService) {
        $scope.animes = Animes.items;

        $scope.showInfo = function(item){
            item.open = !!!item.open;
        };

        $scope.search = function(item){
            searchDialogService.search(item.title,'mal-anime').then(function(result){
                item.title = result.title;
                item.info = result.info;
                valuesService.update(item);
            });
        };

        $scope.dropped = function(item){
            valuesService.dropped(item)
        };
        $scope.remove = function(anime){
            valuesService.removeWithDlg('anime',$scope.animes,anime);
        };

        $scope.update = function(anime){
            valuesService.update(anime).then(function(updated){
                updated.editable = false;
            });
        };

        $scope.cancel = function(anime){
            if(anime.isnew){
                $scope.newanime= {};
            }
            anime.editable = false;
        };

        $scope.add = function(){
            $scope.newanime = {isnew:true};
        };

        $scope.create = function(anime){
            Animes.post(anime).then(function(addedAnime){
                $scope.newanime = {};
                $scope.animes.push(addedAnime);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(anime){
            valuesService.finished(anime);
        };

        $scope.increaseEp = function(anime){
            valuesService.increaseEp(anime);
        };

        $scope.decreaseEp = function(anime){
            valuesService.decreaseEp(anime);
        };
    }]);