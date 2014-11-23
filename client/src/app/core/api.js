angular.module('core').factory('apiService', ['$http', function ($http) {
    var prefix = "api/";

    function baseName(url) {
        return prefix + url;
    }

    function get(url) {
        return $http.get(baseName(url));
    }

    function post(url, data) {
        return $http.post(baseName(url), data);
    }

    function put(url, data) {
        return $http.put(baseName(url), data);
    }

    function del(url) {
        return $http.delete(baseName(url));
    }

    return {
        get: get,
        post: post,
        put: put,
        delete: del
    };
}]);