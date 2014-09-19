angular.module('providers')
    .controller('searchDialogCtrl', ['$scope', '$modalInstance', 'initialtitle', 'initialprovider', 'searchService', function ($scope, $modalInstance, initialtitle, initialprovider, searchService) {
        $scope.selectedInfo = {};
        $scope.infos = [];
        $scope.selectedTitle = '';
        $scope.keyword = initialtitle;
        $scope.currentProvider = searchService.getProvider(initialprovider);
        $scope.providers = searchService.getProviders();
        $scope.dropdown = {
            provideropen: false,
            titleopen:false
        };

        $scope.search = function (keywords) {
            var encodedKeywords = encodeURIComponent(keywords);
            return $scope.currentProvider.search(encodedKeywords).then(function (items) {
                $scope.infos = items;
            });
        };

        $scope.selectProvider = function (provider,$event) {
            $scope.currentProvider = provider;
            $scope.infos = [];
            $scope.selectedInfo = {};
            $scope.selectedTitle = '';
            dropdownFix($event);
            $scope.dropdown.provideropen = false;
        };

        function dropdownFix($event){
            // this is a fix for the dropdown to close on click
            $event.preventDefault();
            $event.stopPropagation();
        }

        $scope.selectInfo = function (info) {
            $scope.selectedInfo = info;
            $scope.selectedTitle = info.title;
        };

        $scope.selectTitle = function (title,$event) {
            $scope.selectedTitle = title;
            dropdownFix($event);
            $scope.dropdown.titleopen = false;
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
    }]);