angular.module('auth', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: ['authService','$routeParams','$location',function(authService,$routeParams,$location){
                if($routeParams.token){
                    authService.loginWithToken($routeParams.token);
                    $location.path('/');
                }
            }]
        });
    }])
    .run(['$rootScope', '$location', '$http', 'authService', function ($rootScope, $location, $http, authService) {
        authService.login();

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            if (!auth.authorize(next.access)) {
//                if (auth.isLoggedIn()) $location.path('/');
//                else $location.path('/login');
//            }
        });
    }])
    .factory('authService', ['$http', 'Restangular', function ($http, Restangular) {
        var currentUser;

        function getUser(){
            currentUser = Restangular.oneUrl('/auth/info').get().$object;
            return currentUser;
        }

        function isLoggedIn(){
            return currentUser && currentUser.displayName;
        }

        function login(){
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
            getUser();
        }

        function setToken(access_token){
            localStorage.setItem('access_token',access_token);
            login();
        }

        function logout(){
            $http.post('/api/logout')
                .success(function (data) {
                    localStorage.removeItem('access_token');
                });
        }

        function isAuthorized(){

        }

        var service = {
            isLoggedIn: isLoggedIn,
            loginWithToken: setToken,
            login: login,
            getUser: getUser,
            logout: logout,
            isAuthorized: isAuthorized,
            currentUser: currentUser
        };
        return service;
    }]);
