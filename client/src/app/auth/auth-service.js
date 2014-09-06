angular.module('auth')
    .factory('authService', ['Restangular', '$location', '$localStorage', function (Restangular, $location, $localStorage) {
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
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + $localStorage.accessToken});
            return Restangular.oneUrl('auth/info').get().then(function (response) {
                angular.extend(authInfo, authInfoDefault);
                authInfo.user = response.user;
                authInfo.roles = response.roles;
                authInfo.isLoggedIn = true;
            }, function () {
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
            return Restangular.oneUrl('auth/logout').post().then(function (data) {
                delete $localStorage.accessToken;
                angular.extend(authInfo, authInfoDefault);
                Restangular.setDefaultHeaders({'Authorization': ''});
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