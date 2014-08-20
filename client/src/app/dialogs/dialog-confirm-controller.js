angular.module('dialogs').controller('confirmDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg', function ($scope, $modalInstance, header, msg) {
    $scope.header = header;
    $scope.message = msg;
    $scope.no = function () {
        $modalInstance.dismiss('no');
    };

    $scope.yes = function () {
        $modalInstance.close('yes');
    };
}]);
