angular.module('core').factory('objectFactory', ['itemRepository', 'paginationCacheService', function (itemRepository, paginationCache) {

    var createItemRepository = function (resourceName) {
        return {
            name: resourceName,
            create: itemRepository.createItem(resourceName),
            update: itemRepository.updateItem(resourceName),
            delete: itemRepository.deleteItem(resourceName),
            items: itemRepository.items(resourceName)
        }
    };

    var createPagination = function (resourceName) {
        return paginationCache.get(resourceName)
    };

    return {
        createItemRepository: createItemRepository,
        createPagination: createPagination
    };
}]);