angular.module('14all').controller('searchDialogCtrl', ['$scope', '$modalInstance', 'initialtitle','initialprovider','templatedetailurl', function ($scope, $modalInstance, initialtitle,initialprovider,templatedetailurl) {
    $scope.selectedInfo = {};
    $scope.title = initialtitle;
    $scope.provider = initialprovider;
    $scope.infos = [];
    $scope.templateDetailUrl = templatedetailurl;
    $scope.selectedTitle = '';

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
        var search = function (title,templateUrl,provider) {
            return $modal.open({
                template: '<div class="modal-header dialog-header-confirm"><h4 class="modal-title">Connect</h4></div>' +
                    '<div class="modal-body"><form role="form" class="form-horizontal">' +
                    '<list-providers keyword="title" infos="infos" initialprovider="provider"></list-providers>' +
                    '</form>' +
                    '<div ng-repeat="info in infos" ng-include="templateDetailUrl" ng-if="!selectedInfo.id || selectedInfo.id==info.id">' +
                    '</div></div>' +
                    '<div class="modal-footer"><button type="button" class="btn btn-default" ng-disabled="selectedTitle ==\'\'" ng-click="ok()">Ok</button><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                controller: 'searchDialogCtrl',
                resolve: {
                    initialtitle: function () {
                        return title;
                    },
                    initialprovider:function(){
                        return provider;
                    },
                    templatedetailurl:function(){
                        return templateUrl;
                    }
                }
            }).result;
        };
        return{
            search: search
        }
    }]);