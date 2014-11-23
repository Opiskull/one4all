angular.module('core').factory('itemCacheService', ['apiService', '$cacheFactory', function (apiService, $cacheFactory) {

    var itemCache = $cacheFactory('item-cache');

    function getId(item) {
        if (angular.isObject(item)) {
            return item.id;
        }
        else {
            return item;
        }
    }

    function setItems(key, items) {
        var cacheItems = getItems(key);
        cacheItems.push.apply(cacheItems, items);
        return cacheItems;
    }

    function getItems(key) {
        var items = itemCache.get(key);
        if (!items) {
            items = itemCache.put(key, []);
        }
        return items;
    }

    function createItem(key, item) {
        var items = getItems(key);
        items.push(item);
    }

    function updateItem(key, item) {
        var items = getItems(key);
        var index = _.findIndex(items, {'id': getId(item)});
        items[index] = item;
        return item;
    }

    function deleteItem(key, item) {
        var items = getItems(key);
        return _.remove(items, {'id': getId(item)});
    }

    function getItem(key, item) {
        var items = getItems(key);
        return _.find(items, {'id': getId(item)});
    }

    return {
        setItems: setItems,
        updateItem: updateItem,
        createItem: createItem,
        deleteItem: deleteItem,
        getItem: getItem,
        getItems: getItems
    };
}]);