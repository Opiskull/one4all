angular.module('serie')
    .controller('SerieListCtrl', ['$scope','serieResource','$location','$filter','itemService','searchDialogService', function ($scope,Series,$location,$filter,itemService,searchDialogService) {
        $scope.series = Series.items;
        $scope.itemService = itemService;

        $scope.search = function(item){
            searchDialogService.search(item.title,'tmdb-serie').then(function(result){
                item.title = result.title;
                itemService.setInfo(item, result.info);
            });
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
    }]);