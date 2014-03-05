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


        // FIX SETTINGS
        var tempSettings = $store.get('settings');
        if(!!tempSettings && angular.isDefined(tempSettings.excludeFinished)){
            $store.remove('settings');
        }
        // FIX SETTINGS
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.logout = authService.logout;
        $scope.settings = $store.bind($scope,'settings',{
            filter:{
                stats:{
                    finished: false,
                    dropped: false
                },
                orderBy:{
                    predicate:'',
                    reverse:false
                },
                keyword:{}
            }
        });

        $scope.orderBy = $scope.settings.filter.orderBy;

        $scope.focus  = {search:true};

        $scope.$on("$routeChangeStart",function(event,next,current){
            $scope.focus.search = false;
        });

        $scope.$on("$routeChangeSuccess",function(event,next,current){
            $scope.focus.search = true;
        });
    }]);
