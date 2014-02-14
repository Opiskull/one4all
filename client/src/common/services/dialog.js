angular.module('14all').controller('confirmDialogCtrl',['$scope','$modalInstance','header','msg',function($scope,$modalInstance,header,msg){
    $scope.header = header;
    $scope.message = msg;
    $scope.no = function(){
        $modalInstance.dismiss('no');
    };

    $scope.yes = function(){
        $modalInstance.close('yes');
    };
}]).
factory('dialogService',['$modal',function($modal){

        var confirm = function(header,msg){
            return $modal.open({
                template : '<div class="modal-header dialog-header-confirm"><h4 class="modal-title">{{header}}</h4></div><div class="modal-body">{{message}}</div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="yes()">Yes</button><button type="button" class="btn btn-primary" ng-click="no()">No</button></div>',
                controller : 'confirmDialogCtrl',
                resolve:{
                    header:function(){return angular.copy(header);},
                    msg:function(){return angular.copy(msg);}
                }
            })
        };


    return{
        confirm: confirm,
        remove: function(type,title){
            return confirm('Delete?',"Delete "+type+" '"+title+"'?").result.then(function(result){
                if(result ==='yes') return true;
                return false;
            },function(result){
                return false;
            });
        }
    }
    }]);