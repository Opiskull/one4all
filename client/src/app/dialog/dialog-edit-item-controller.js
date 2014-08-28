angular.module('dialog').controller('editDialogCtrl', ['$scope', '$modalInstance', 'dialogParameters', function ($scope, $modalInstance, dialogParameters) {
    $scope.item = dialogParameters.item;
    $scope.defaultProvider = dialogParameters.defaultProvider;
    $scope.headerTitle = dialogParameters.headerTitle;
    $scope.templateUrl = dialogParameters.templateUrl;
    $scope.searchInfoCallback = dialogParameters.searchInfoCallback;

    $scope.save = function () {
        $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);