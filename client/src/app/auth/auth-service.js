angular.module('auth')
    .factory('authService', ['apiService', '$location', '$localStorage', '$http', function (apiService, $location, $localStorage, $http) {
        var authInfoDefault = {
            isLoggedIn: false,
            user: {},
            roles: []
        };

        var authInfo = {};

        /**
         * sets the bearer header for authorization
         * @returns {*}
         */
        function authenticateWithServer() {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.accessToken;
            return apiService.get('auth/info').success(function (response) {
                angular.extend(authInfo, authInfoDefault);
                if (response.user) {
                    authInfo.user = response.user;
                    authInfo.roles = response.roles;
                    authInfo.isLoggedIn = true;
                } else {

                }
            }).error(function (response) {
                angular.extend(authInfo, authInfoDefault);
            });
        }

        /**
         * sets the accessToken for the login
         * @param accessToken
         */
        function login(accessToken) {
            $localStorage.accessToken = accessToken;
            authenticateWithServer();
            $location.url('/');
        }

        /**
         * logout will remove the accessToken from the client
         */
        function logout() {
            return apiService.post('auth/logout').success(function (response) {
                delete $localStorage.accessToken;
                angular.extend(authInfo, authInfoDefault);
                $http.defaults.headers.common.Authorization = '';
                $location.url('/');
            });
        }

        function isAuthorized() {
            return true;
        }

        return {
            login: login,
            authenticateWithServer: authenticateWithServer,
            logout: logout,
            isAuthorized: isAuthorized,
            authInfo: authInfo
        };
    }]);