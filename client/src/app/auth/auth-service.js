angular.module('auth')
    .factory('authService', ['Restangular', '$location', '$localStorage', function (Restangular, $location, $localStorage) {
        var authInfoDefault = {
            isLoggedIn: false,
            user: {},
            roles: []
        };

        var authInfo = {};

        /**
         * returns the authinfo from the user
         * @returns {*}
         */
        function getAuthInfo() {
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
         * sets the bearer header for authorization
         * @returns {*}
         */
        function authenticate() {
            Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + $localStorage.access_token});
            return getAuthInfo();
        }

        /**
         * stores the token on the client side
         * @param access_token
         */
        function setToken(access_token) {
            $localStorage.access_token = access_token;
            authenticate();
        }

        /**
         * sets the access_token for the login
         * @param access_token
         */
        function login(access_token) {
            setToken(access_token);
            $location.url('/');
        }

        /**
         * logout will remove the access_token from the client
         */
        function logout() {
            Restangular.oneUrl('auth/logout').post().then(function (data) {
                delete $localStorage.access_token;
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
            authenticate: authenticate,
            getAuthInfo: getAuthInfo,
            logout: logout,
            isAuthorized: isAuthorized,
            authInfo: authInfo
        };
    }]);