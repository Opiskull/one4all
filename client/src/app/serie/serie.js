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

        $scope.dropped = function(item){
            valuesService.dropped(item)
        };

        $scope.remove = function(serie){
            valuesService.removeWithDlg('serie',$scope.series,serie);
        };

        $scope.update = function(serie){
            valuesService.update(serie).then(function(updated){
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