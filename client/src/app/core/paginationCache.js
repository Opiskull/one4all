angular.module('core').factory('paginationCacheService', ['apiService', '$cacheFactory', function (apiService, $cacheFactory) {

    var paginationCache = $cacheFactory('pagination');

    function get(resource) {
        var pagination = paginationCache.get(resource);
        if (!pagination) {
            pagination = paginationCache.put(resource, {
                currentPage: 1,
                itemsPerPage: 25,
                maxSizeCount: 5,
                totalItems: [],
                totalItemsCount: 0,
                filteredItems: [],
                filteredItemsCount: 0,
                pageItems: [],
                pageItemsCount: 0
            });
        }
        return pagination;
    }

    return {
        get: get
    };
}]);