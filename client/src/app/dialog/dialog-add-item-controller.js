angular.module('dialog').controller('addDialogCtrl', ['$scope', '$modalInstance', 'dialogContext', function ($scope, $modalInstance, dialogContext) {
    $scope.item = {};
    $scope.defaultProvider = dialogContext.defaultProvider;
    $scope.headerTitle = dialogContext.headerTitle;
    $scope.templateUrl = dialogContext.templateUrl;
    $scope.searchInfoCallback = dialogContext.searchInfoCallback;
    $scope.onTagAdded = function(tag){
        tag.text = tag.text.toLowerCase();
    };

    $scope.save = function () {
        $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);