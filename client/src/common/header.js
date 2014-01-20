angular.module('14all').controller('HeaderCtrl',['$scope','authService',function($scope,authService){
    $scope.login = authService.login;
    $scope.loggedIn = authService.isLoggedIn;
    $scope.logout = authService.logout;
}]);
