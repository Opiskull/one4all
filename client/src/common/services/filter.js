angular.module('one4all').factory('filterService', ['settingsService', '$rootScope', '$q','logger', function (settingsService, $rootScope, $q, logger) {
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

    function filterItems(pagination) {
        var items = pagination.totalItems;
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
        $rootScope.$emit('filter');
    }

    function loadItems(pagination, resource) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        if (!resource.items) {
            resource.getList().then(function (items) {
                resource.items = items;
                pagination.totalItems = items;
                filterItems(pagination);
                deferred.resolve(pagination);
            },logger.handleRestErrorResponse);
        } else {
            pagination.totalItems = resource.items;
            filterItems(pagination);
            deferred.resolve(pagination);
        }
        return promise;
    }

    return {
        filterItems: filterItems,
        orderBy: orderBy,
        forceFilter: forceFilter,
        loadItems: loadItems
    };
}]);