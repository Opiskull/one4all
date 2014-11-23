angular.module('core').factory('itemRepository', ['itemCacheService', 'resourceApiService', '$rootScope',
    function (itemCache, resourceApiService, $rootScope) {

        function deleteItem(moduleKey, item) {
            return resourceApiService.deleteRequest(moduleKey, item).success(function () {
                itemCache.deleteItem(moduleKey, item);
                $rootScope.$emit('filter');
            });
        }

        function updateItem(moduleKey, item) {
            return resourceApiService.updateRequest(moduleKey, item).success(function (response) {
                itemCache.updateItem(moduleKey, response);
                $rootScope.$emit('filter');
            });
        }

        function createItem(moduleKey, item) {
            return resourceApiService.createRequest(moduleKey, item).success(function (response) {
                itemCache.createItem(moduleKey, response);
                $rootScope.$emit('filter');
            });
        }

        return {
            deleteItem: function (moduleKey) {
                return function (item) {
                    return deleteItem(moduleKey, item);
                }
            },
            updateItem: function (moduleKey) {
                return function (item) {
                    return updateItem(moduleKey, item);
                }
            },
            createItem: function (moduleKey) {
                return function (item) {
                    return createItem(moduleKey, item);
                }
            },
            items: function (moduleKey) {
                return itemCache.getItems(moduleKey);
            }
        };
    }]);
