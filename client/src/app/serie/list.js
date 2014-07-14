angular.module('serie')
    .controller('SerieListCtrl', ['$scope', 'serieResource', 'itemService', function ($scope, Series, itemService) {
        $scope.series = Series.items;
        $scope.itemService = itemService;
        $scope.defaultProvider = 'tmdb-serie';
        $scope.pagination = { currentPage : 1, itemsPerPage: 20, maxSize: 5};

        $scope.remove = function (serie) {
            itemService.removeWithDlg('serie', $scope.series, serie);
        };

        $scope.update = function (serie) {
            itemService.update(serie).then(function (updated) {
                updated.editable = false;
            });
        };

        $scope.cancel = function (serie) {
            if (serie.isnew) {
                $scope.newserie = {};
            }
            serie.editable = false;
        };

        $scope.add = function () {
            $scope.newserie = {isnew: true};
        };

        $scope.create = function (serie) {
            Series.post(serie).then(function (addedSerie) {
                $scope.newserie = {};
                $scope.series.push(addedSerie);
            }, function (response) {
                console.log("Error");
            });
        };
    }]);