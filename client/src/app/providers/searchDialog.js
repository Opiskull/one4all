angular.module('14all.providers').controller('searchDialogCtrl', ['$scope', '$modalInstance', 'initialtitle', 'initialprovider', 'searchService', function ($scope, $modalInstance, initialtitle, initialprovider, searchService) {
    $scope.selectedInfo = {};
    $scope.infos = [];
    $scope.selectedTitle = '';
    $scope.keyword = initialtitle;
    $scope.currentProvider = searchService.getProvider(initialprovider);
    $scope.providers = searchService.getProviders();

    $scope.search = function (keywords) {
        return $scope.currentProvider.search(keywords).then(function (items) {
            $scope.infos = items;
        });
    };

    $scope.selectProvider = function (provider) {
        $scope.currentProvider = provider;
    };

    $scope.selectInfo = function (info) {
        $scope.selectedInfo = info;
        $scope.selectedTitle = info.title;
    };

    $scope.selectTitle = function (title) {
        $scope.selectedTitle = title;
    };

    $scope.ok = function () {
        var result = {title: $scope.selectedTitle, info: $scope.selectedInfo};
        $modalInstance.close(result);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}])
    .factory('searchDialogService', ['$modal', function ($modal) {
        var search = function (title, initalprovider) {
            return $modal.open({
                templateUrl: 'providers/search-dialog.html',
                controller: 'searchDialogCtrl',
                resolve: {
                    initialtitle: function () {
                        return title;
                    },
                    initialprovider: function () {
                        return initalprovider;
                    }
                }
            }).result;
        };
        return{
            search: search
        }
    }]);