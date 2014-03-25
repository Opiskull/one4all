angular.module('14all').controller('searchDialogCtrl',['$scope','$modalInstance','initialtitle',function($scope,$modalInstance,initialtitle){
    $scope.info = {};
    $scope.title = initialtitle;
    $scope.infos = [];

    $scope.selectInfo = function(info){
        $scope.info = info;
    };

    $scope.selectTitle = function(title){
        $modalInstance.close(title,$scope.info);
    };

    $scope.cancel = function(){
        $modalInstance.dismiss();
    };
}])
    .factory('searchDialogService',['$modal','searchService',function($modal,searchService){
        var search = function(title){
            return $modal.open({
                template : '<div class="modal-header dialog-header-confirm"><h4 class="modal-title">Connect</h4></div>' +
                    '<div class="modal-body"><form role="form" class="form-horizontal">' +
                    '<list-providers keyword="title" infos="infos" initialprovider="\'mal-anime\'"></list-providers>' +
                    '</form></div>'  +
                    '<div ng-repeat="info in infos">' +
                    '<anime-detail anime="info"></anime-detail></div>'+
                    '<div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                controller : 'searchDialogCtrl',
                resolve:{
                    initialtitle:function(){return title;}
                }
            }).result;
        };
        return{
            search:search
        }
    }]);