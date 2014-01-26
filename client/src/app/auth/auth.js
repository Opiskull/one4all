angular.module('auth', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: ['authService','$routeParams',function(authService,$routeParams){
                if($routeParams.token){
                    authService.login($routeParams.token);
                }
            }]
        }).
        when('/logout',{
                templateUrl: 'auth/logout.html',
                controller: ['authService','$location',function(authService,$location){
                    authService.logout();
                }]
            });
    }])
    .run(['$rootScope', 'authService', function ($rootScope, authService) {
        authService.authenticate();
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            if (!auth.authorize(next.access)) {
//                if (auth.isLoggedIn()) $location.path('/');
//                else $location.path('/login');
//            }
        });
    }])
    .factory('authService', ['$http', 'Restangular','$location', function ($http, Restangular,$location) {
        var currentUser;

        function getUser(){
            currentUser = Restangular.oneUrl('auth/info').get().$object;
            return currentUser;
        }

        function isLoggedIn(){
            return currentUser && currentUser.displayName;
        }

        function authenticate(){
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
            getUser();
        }

        function setToken(access_token){
            localStorage.setItem('access_token',access_token);
            authenticate();
        }

        function login(access_token){
            setToken(access_token);
            $location.url('/');
        }

        function logout(){
            $http.post('/api/auth/logout')
                .success(function (data) {
                    localStorage.removeItem('access_token');
                    $location.url('/');
                });
        }

        function isAuthorized(){

        }

        var service = {
            isLoggedIn: isLoggedIn,
            login: login,
            authenticate: authenticate,
            getUser: getUser,
            logout: logout,
            isAuthorized: isAuthorized,
            currentUser: currentUser
        };
        return service;
    }]);
