angular.module('auth')
.factory('authService', ['Restangular','$location','$store', function (Restangular,$location,$store) {
    var authInfo = {};

        /**
         * returns the authinfo from the user
         * @returns {*}
         */
    function getAuthInfo(){
        return Restangular.oneUrl('auth/info').get().then(function(response){
            authInfo = response;
        },function(){
            authInfo = {};
        });
    }

        /**
         * returns true if the user is authenticated
         * or false when not
         * @returns {{}|*}
         */
    function isLoggedIn(){
        return authInfo && authInfo.user && authInfo.user.username;
    }

        /**
         * sets the bearer header for authorization
         * @returns {*}
         */
    function authenticate(){
        Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + $store.get('access_token')});
        return getAuthInfo();
    }

        /**
         * stores the token on the client side
         * @param access_token
         */
    function setToken(access_token){
        $store.set('access_token',access_token);
        authenticate();
    }

        /**
         * sets the access_token for the login
         * @param access_token
         */
    function login(access_token){
        setToken(access_token);
        $location.url('/');
    }

        /**
         * logout will remove the access_token from the client
         */
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