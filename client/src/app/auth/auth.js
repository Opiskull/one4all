angular.module('auth', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: ['$scope','authService','$routeParams',function($scope,authService,$routeParams){
                if($routeParams.token){
                    authService.login($routeParams.token);
                }
                $scope.heading = 'Login';
                $scope.message='You need to login to view this page!';
            }]
        })
            .when('/notauthorized',{
                templateUrl: 'auth/message.html',
                controller: ['$scope','authService',function($scope,authService){
                    $scope.heading='Not Authorized';
                    $scope.message= 'You are not authorized to view this page!';
                }]
            })
            .when('/logout',{
                templateUrl: 'auth/message.html',
                controller: ['$scope','authService',function($scope,authService){
                    $scope.heading='Logout';
                    $scope.message= 'Your logout was a success!';
                    authService.logout();
                }]
            }).
        otherwise({
                templateUrl: 'auth/message.html',
                controller: ['$scope',function($scope){
                    $scope.heading = 'Welcome!';
                    $scope.message='Welcome to 14all! :)';
                }]
            });
    }])
    .run(['$rootScope', 'authService','$location', function ($rootScope, authService,$location) {
        authService.authenticate().then(function(){
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if((next.$$route) && (next.$$route.authRequired)){
                    if(!authService.isLoggedIn()){
                        $location.path("/login");
                    }
                }
            });
        });
    }])
    .factory('authService', ['Restangular','$location','$store', function (Restangular,$location,$store) {
        var authInfo;

        function getAuthInfo(){
             return Restangular.oneUrl('auth/info').get().then(function(response){
                authInfo = response;
            },function(){
                 authInfo = {};
             });
        }

        function isLoggedIn(){
            return authInfo && authInfo.user && authInfo.user.username;
        }

        function authenticate(){
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + $store.get('access_token')});
            return getAuthInfo();
        }

        function setToken(access_token){
            $store.set('access_token',access_token);
            authenticate();
        }

        function login(access_token){
            setToken(access_token);
            $location.url('/');
        }

        function logout(){
            Restangular.oneUrl('auth/logout').post().then(function(data){
                $store.remove('access_token');
                authInfo = {};
                Restangular.setDefaultHeaders({'Authorization':''});
                $location.url('/');
            });
        }

        function isAuthorized(){

        }

        var service = {
            isLoggedIn: isLoggedIn,
            login: login,
            authenticate: authenticate,
            getAuthInfo: getAuthInfo,
            logout: logout,
            isAuthorized: isAuthorized,
            authInfo: authInfo
        };
        return service;
    }]);
