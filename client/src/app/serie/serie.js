angular.module('serie',['ngRoute','serie.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/serie', {
            templateUrl: 'serie/list.html',
            controller: 'SerieListCtrl',
            authRequired: true
        });
    }])
    .controller('SerieListCtrl', ['$scope','Series','$location','$filter','valuesService', function ($scope,Series,$location,$filter,valuesService) {
        $scope.series = Series.items;

        function removeSerie(serie){
            $scope.series.splice($scope.series.indexOf(serie),1);
        }

        $scope.remove = function(serie){
            serie.remove().then(function(){
                removeSerie(serie);
            });
        };

        $scope.update = function(serie){
            valuesService.then(function(updated){
                updated.editable = false;
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
            valuesService.finished(serie);
        };

        $scope.increaseSe = function(serie){
            valuesService.increaseSe(serie);
        };

        $scope.decreaseSe = function(serie){
            valuesService.decreaseSe(serie);
        };

        $scope.increaseEp = function(serie){
            valuesService.increaseEp(serie);
        };

        $scope.decreaseEp = function(serie){
            valuesService.decreaseEp(serie);
        };
    }]);