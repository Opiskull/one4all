angular.module('14all').controller('searchDialogCtrl',['$scope','$modalInstance','item',function($scope,$modalInstance,item){
    $scope.info = {};
    $scope.item = item;
    $scope.infos = [];

    $scope.cancel = function(){
        $modalInstance.dismiss();
    };

    $scope.selectTitle = function(title){
        $modalInstance.close(title,$scope.info);
    } 
}])
    .factory('searchDialogService',['$modal','searchService',function($modal,searchService){
        var search = function(item){
            return $modal.open({
                template : '<div class="modal-header dialog-header-confirm"><h4 class="modal-title">Connect</h4></div>' +
                    '<div class="modal-body"><form role="form" class="form-horizontal">' +
                    '<list-providers initial-value="{{item.title}}" infos="infos"></list-providers>' +
                    '</form></div>'  +
                    '<ul><li ng-repeat="info in infos">{{info.title}}</li></ul>'+
                    '<div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                controller : 'searchDialogCtrl',
                resolve:{
                    item:function(){return angular.copy(item);}
                    //item:item
                }
            }).result;
        };
        return{
            search:search
        }
    }]);