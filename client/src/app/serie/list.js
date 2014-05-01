angular.module('serie')
    .controller('SerieListCtrl', ['$scope','serieResource','$location','$filter','itemService', function ($scope,Series,$location,$filter,itemService) {
        $scope.series = Series.items;

        $scope.dropped = function(item){
            itemService.dropped(item)
        };

        $scope.remove = function(serie){
            itemService.removeWithDlg('serie',$scope.series,serie);
        };

        $scope.update = function(serie){
            itemService.update(serie).then(function(updated){
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
            itemService.finished(serie);
        };

        $scope.increaseSe = function(serie){
            itemService.increaseSe(serie);
        };

        $scope.decreaseSe = function(serie){
            itemService.decreaseSe(serie);
        };

        $scope.increaseEp = function(serie){
            itemService.increaseEp(serie);
        };

        $scope.decreaseEp = function(serie){
            itemService.decreaseEp(serie);
        };
    }]);