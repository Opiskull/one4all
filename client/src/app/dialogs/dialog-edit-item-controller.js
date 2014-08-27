angular.module('dialogs').controller('editDialogCtrl', ['$scope', '$modalInstance', 'item', 'defaultProvider', 'headerTitle', 'templateUrl', function ($scope, $modalInstance, item, defaultProvider, headerTitle, templateUrl) {
    $scope.item = item;
    $scope.defaultProvider = defaultProvider;
    $scope.headerTitle = headerTitle;
    $scope.templateUrl = templateUrl;

    $scope.save = function () {
        $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);