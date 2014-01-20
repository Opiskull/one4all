angular.module('auth', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auth/google', {

        })
    }])
    .run(['$rootScope', '$location', '$http', 'authService', function ($rootScope, $location, $http, authService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
//            if (!auth.authorize(next.access)) {
//                if (auth.isLoggedIn()) $location.path('/');
//                else $location.path('/login');
//            }
        });
    }])
    .factory('authService', ['$http', 'restangular', function ($http, restangular) {
        if (localStorage.getItem('access_token')) {
            restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
        }

        var currentUser = restangular.customGet('/auth/info').success(function (data) {
            return data;
        }).error(function (err) {
            console.log(err);
        });
        var service = {
            isLoggedIn: function (user) {
                if (user === undefined)
                    user = currentUser;
                return user !== undefined;
            },
            login: function () {
                $http.get('https://peerzone.net/api/auth/google')
                    .success(function (data) {
                        localStorage.setItem('access_token', data.access_token);
                    });
            },
            logout: function () {
                $http.post('/api/logout')
                    .success(function (data) {
                        localStorage.removeItem('access_token');
                    });
            },
            hasaccestoken: function () {
                if (localStorage.getItem('access_token')) {
                    restangular.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
                }
            }
        };
        return service;
    }]);
