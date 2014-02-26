angular.module('14all', ['ui.bootstrap','ngAnimate',
    'auth',
    /* Modules */
    'manga','movie','serie','anime','game','book',
    '14all.templates'])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.setBaseUrl('/api');
    }])
    .controller('AppCtrl',['$scope','$location','authService','$store',function($scope,$location,authService,$store){
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.logout = authService.logout;

        $scope.settings = $store.bind($scope,'settings',{
            excludeFinished: false,
            excludeDropped: false
        });

        $scope.focus  = {search:true};

        $scope.$on("$routeChangeStart",function(event,next,current){
            $scope.focus.search = false;
        });

        $scope.$on("$routeChangeSuccess",function(event,next,current){
            $scope.focus.search = true;
        });
    }]);
