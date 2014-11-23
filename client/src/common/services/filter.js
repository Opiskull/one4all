angular.module('one4all').factory('filterService', ['settingsService', '$rootScope', '$q', 'logger', 'itemCacheService', 'paginationCacheService', '$timeout', function (settingsService, $rootScope, $q, logger, itemCache, paginationCache, $timeout) {
    var settings = settingsService.settings;

    function hasKeyword() {
        return settings.filters.keyword !== '';
    }

    function hasTags(){
        return settings.filters.tags && settings.filters.tags.length > 0;
    }

    function itemHasState(item) {
        return item.state && item.state != '';
    }

    function itemHasTags(item){
        return item.tags && item.tags.length > 0;
    }

    function filterItemsWithTags(items){
        return _.filter(items, filterItemWithTags);
    }

    function filterItemWithTags(item){
        var result = false;
        if(itemHasTags(item)) {
            _.each(settings.filters.tags, function (tag) {
                if (_.find(item.tags, {'text': tag.text})) result = true;
            });
        }
        return settings.filters.exclude ? !result : result;
    }

    function filterItemsWithKeyword(items) {
        return _.filter(items, function (item) {
            return _.contains(item.title.toLowerCase(), settings.filters.keyword.toLowerCase());
        });
    }

    function filterItemsWithState(items) {
        return _.filter(items, filterItemWithState);
    }

    function filterItemWithState(item) {
        var result = false;
        if (itemHasState(item)) {
            angular.forEach(settings.filters.stats, function (stat, statKey) {
                if (stat) {
                    if (item.state === statKey) {
                        result = true;
                    }
                }
            });
        } else {
            if (settings.filters.stats.none) {
                result = true;
            }
        }
        return settings.filters.exclude ? !result : result;
    }

    function orderItems(items) {
        items = _.sortBy(items, settings.orderBy.predicate);
        return settings.orderBy.reverse ? items.reverse() : items;
    }

    function filterResourceItems(resource) {
        var items = itemCache.getItems(resource);
        var pagination = paginationCache.get(resource);
        if (!items) return;
        pagination.totalItemsCount = items.length;
        if (hasKeyword())
            items = filterItemsWithKeyword(items);
        if (hasTags())
            items = filterItemsWithTags(items);
        items = filterItemsWithState(items);
        items = orderItems(items);
        pagination.filteredItems = items;
        pagination.filteredItemsCount = items.length;
        calcPagination(pagination);
    }

    function calcPagination(pagination) {
        var startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
        var endIndex = startIndex + pagination.itemsPerPage;
        pagination.pageItems = pagination.filteredItems.slice(startIndex, endIndex);
        pagination.pageItemsCount = pagination.pageItems.length;
    }

    function orderBy(property) {
        if (settings.orderBy.predicate == property) {
            settings.orderBy.reverse = !settings.orderBy.reverse;
        }
        settings.orderBy.predicate = property;
        forceFilter();
    }

    function forceFilter() {
        $timeout(function () {
            $rootScope.$emit('filter');
        });
    }

    function filterAllResources() {
        var cache = paginationCache.getCache();
        _.each(Object.keys(cache), function (resource) {
            filterResourceItems(resource);
        });
    }

    function filterAllResourcesById(id) {
        var cache = paginationCache.getCache();
        _.each(Object.keys(cache), function (resource) {
            var items = itemCache.getItems(resource);
            var pagination = paginationCache.get(resource);
            var item = _.find(items, {id: id});
            items = [];
            if (item) items.push(item);
            pagination.filteredItems = items;
            pagination.filteredItemsCount = items.length;
            calcPagination(pagination);
        });
    }

    return {
        filterItems: filterResourceItems,
        filterAllResources: filterAllResources,
        filterAllResourcesById: filterAllResourcesById,
        orderBy: orderBy,
        forceFilter: forceFilter
    };
}]);