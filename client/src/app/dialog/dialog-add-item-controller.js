angular.module('dialog').controller('addDialogCtrl', ['$scope', '$modalInstance', 'defaultProvider', 'headerTitle', 'templateUrl', function ($scope, $modalInstance, defaultProvider, headerTitle, templateUrl) {
    $scope.item = {};
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