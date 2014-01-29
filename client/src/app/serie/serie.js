angular.module('serie',['ngRoute','serie.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/serie', {
            templateUrl: 'serie/list.html',
            controller: 'SerieListCtrl',
            authRequired: true
        });
    }])
    .controller('SerieListCtrl', ['$scope','Series','$location','$filter', function ($scope,Series,$location,$filter) {
        $scope.series = Series.getList().$object;;

        function removeSerie(serie){
            $scope.series.splice($scope.series.indexOf(serie),1);
        }

        $scope.remove = function(serie){
            serie.remove().then(function(){
                removeSerie(serie);
            });
        };

        $scope.update = function(serie){
            serie.put().then(function(updatedSerie){
                serie.editable = false;
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.cancel = function(serie){
            if(serie.isnew){
                $scope.newserie= {};
            }
            serie.editable = false;
        };

        $scope.add = function(){
            $scope.newserie = {isnew:true};
        };

        $scope.create = function(serie){
            Series.post(serie).then(function(addedSerie){
                $scope.newserie = {};
                $scope.series.push(addedSerie);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(serie){
            serie.finished = !serie.finished;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.increaseSe = function(serie){
            serie.season +=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.decreaseSe = function(serie){
            serie.season -=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt;
            });
        };

        $scope.increaseEp = function(serie){
            serie.episode +=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt
            });
        };

        $scope.decreaseEp = function(serie){
            serie.episode -=1;
            serie.put().then(function(updatedSerie){
                serie.updatedAt = updatedSerie.updatedAt;
            });
        };
    }]);