angular.module('core').factory('paginationCacheService', ['apiService', '$cacheFactory', function (apiService, $cacheFactory) {

    var paginationCache = {};

    function get(resource) {
        var pagination = paginationCache[resource];
        if (!pagination) {
            pagination = {
                currentPage: 1,
                itemsPerPage: 25,
                maxSizeCount: 5,
                totalItems: [],
                totalItemsCount: 0,
                filteredItems: [],
                filteredItemsCount: 0,
                pageItems: [],
                pageItemsCount: 0
            };
            paginationCache[resource] = pagination;
        }
        return pagination;
    }

    function getCache() {
        return paginationCache;
    }

    return {
        getCache: getCache,
        get: get
    };
}]);