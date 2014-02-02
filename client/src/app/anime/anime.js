angular.module('anime',['ngRoute','anime.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/anime', {
            templateUrl: 'anime/list.html',
            controller: 'AnimeListCtrl',
            authRequired: true
        });
    }])
    .controller('AnimeListCtrl', ['$scope','Animes','$location','$filter','valuesService', function ($scope,Animes,$location,$filter,valuesService) {
        $scope.animes = Animes.items;

        function removeAnime(anime){
            $scope.animes.splice($scope.animes.indexOf(anime),1);
        }

        $scope.remove = function(anime){
            anime.remove().then(function(){
                removeAnime(anime);
            });
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