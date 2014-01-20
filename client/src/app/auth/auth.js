angular.module('auth',['ngRoute']).factory('authService',['$http','restangular',function($http,restangular){
    var service = {
        isLoggedIn: function(user){
            if(user === undefined)
                user = currentUser;
            return user !== undefined;
        },
        login : function(){
            $http.get('https://peerzone.net/api/auth/google')
                .success(function(data){
                    localStorage.setItem('access_token',data.access_token);
            });
        },
        logout : function(){
            $http.get('/api/logout')
                .success(function(data){
                    localStorage.removeItem('access_token');
                });
        },
        loggedin : function(){
            return $http.get('/api/loggedin').success(function(data){
                return data.loggedin;
            });
        },
        hasaccestoken : function(){
            if(localStorage.getItem('access_token')){
                restangular.setDefaultHeaders({'Authorization':'Bearer '+ localStorage.getItem('access_token')});
            }
        }
    };
    return service;
}]);
