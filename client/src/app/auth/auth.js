angular.module('auth', ['ngRoute'])
    .run(['$rootScope', '$location', '$http', 'authService', function ($rootScope, $location, $http, authService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
//            if (!auth.authorize(next.access)) {
//                if (auth.isLoggedIn()) $location.path('/');
//                else $location.path('/login');
//            }
        });
    }])
    .factory('authService', ['$http', 'Restangular', function ($http, Restangular) {
        var token = localStorage.getItem('access_token');
        if (token) {
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + token});
        }

        var currentUser = Restangular.oneUrl('/auth/info').get().$object;

        var service = {
            isLoggedIn: function (user) {
                if (user === undefined)
                    user = currentUser;
                return angular.isString(user.displayName);
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
            isAuthorized: function(){

            },
            currentUser: currentUser
        };
        return service;
    }]);
