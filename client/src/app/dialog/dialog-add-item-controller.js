angular.module('dialog').controller('addDialogCtrl', ['$scope', '$modalInstance', 'dialogContext', 'tagsService', function ($scope, $modalInstance, dialogContext, tagsService) {
    $scope.item = {};
    $scope.defaultProvider = dialogContext.defaultProvider;
    $scope.headerTitle = dialogContext.headerTitle;
    $scope.templateUrl = dialogContext.templateUrl;
    $scope.searchInfoCallback = dialogContext.searchInfoCallback;
    $scope.onTagAdded = function(tag){
        tag.text = tag.text.toLowerCase();
    };

    $scope.getUserTags = function (query) {
        return tagsService.getUserTags(query);
    };

    $scope.save = function () {
        $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);