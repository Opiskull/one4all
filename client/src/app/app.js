angular.module('14all', ['ui.bootstrap','resources','manga','auth','templates.app'])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
    }])
    .controller('AppCtrl',['$scope','authService',function($scope,authService){
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.logout = authService.logout;
    }]);;
