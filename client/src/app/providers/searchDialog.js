angular.module('14all.providers')
    .controller('searchDialogCtrl', ['$scope', '$modalInstance', 'initialtitle', 'initialprovider', 'searchService', function ($scope, $modalInstance, initialtitle, initialprovider, searchService) {
        $scope.selectedInfo = {};
        $scope.infos = [];
        $scope.selectedTitle = '';
        $scope.keyword = initialtitle;
        $scope.currentProvider = searchService.getProvider(initialprovider);
        $scope.providers = searchService.getProviders();

        $scope.search = function (keywords) {
            var encodedKeywords = encodeURIComponent(keywords);
            return $scope.currentProvider.search(encodedKeywords).then(function (items) {
                $scope.infos = items;
            });
        };

        $scope.selectProvider = function (provider) {
            $scope.currentProvider = provider;
            $scope.infos = [];
            $scope.selectedInfo = {};
            $scope.selectedTitle = '';
        };

        $scope.selectInfo = function (info) {
            $scope.selectedInfo = info;
            $scope.selectedTitle = info.title;
        };

        $scope.selectTitle = function (title) {
            $scope.selectedTitle = title;
        };

        $scope.ok = function () {
            var result = {
                title: $scope.selectedTitle,
                info: $scope.selectedInfo
            };
            result.info.provider = $scope.currentProvider.title;
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