angular.module('14all').controller('HeaderCtrl',['$scope','authService',function($scope,authService){
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.logout = authService.logout;
}]);
