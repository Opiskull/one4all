angular.module('core').factory('resourceApiService', ['apiService', function (api) {
    var urlWithId = function (url, item) {
        url += "/";
        if (angular.isObject(item)) {
            return url + item.id;
        } else {
            return url + item;
        }
    };

    function createRequest(resource, item) {
        return api.post(resource, item);
    }

    function updateRequest(resource, item) {
        resource = urlWithId(resource, item);
        return api.put(resource, item);
    }

    function deleteRequest(resource, item) {
        resource = urlWithId(resource, item);
        return api.delete(resource, item);
    }

    function getItemsRequest(resource) {
        return api.get(resource);
    }

    function getOneRequest(resource, item) {
        resource = urlWithId(resource, item);
        return api.get(resource);
    }

    return {
        createRequest: createRequest,
        updateRequest: updateRequest,
        deleteRequest: deleteRequest,
        getAllRequest: getItemsRequest,
        getOneRequest: getOneRequest
    };
}]);