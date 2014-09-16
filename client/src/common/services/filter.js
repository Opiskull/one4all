angular.module('one4all').factory('filterService', ['settingsService', '$rootScope', '$q','logger', function (settingsService, $rootScope, $q, logger) {
    var settings = settingsService.settings;

    function hasKeyword() {
        return settings.filters.keyword !== '';
    }

    function itemHasState(item) {
        return item.state && item.state != '';
    }

    function filterByKeyword(items) {
        return _.filter(items, function (item) {
            return _.contains(item.title.toLowerCase(), settings.filters.keyword.toLowerCase());
        });
    }

    function filterByStats(items) {
        return _.filter(items, filterItemByStats);
    }

    function filterItemByStats(item) {
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

    function applyFilter(pagination) {
        var items = pagination.totalItems;
        if (!items) return;
        pagination.totalItemsCount = items.length;
        if (hasKeyword())
            items = filterByKeyword(items);
        items = filterByStats(items);
        items = orderItems(items);
        pagination.filteredItems = items;
        pagination.filteredItemsCount = items.length;
        applyPagination(pagination);
    }

    function applyPagination(pagination) {
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
                applyFilter(pagination);
                deferred.resolve(pagination);
            },logger.handleRestErrorResponse);
        } else {
            pagination.totalItems = resource.items;
            applyFilter(pagination);
            deferred.resolve(pagination);
        }
        return promise;
    }

    return {
        applyFilter: applyFilter,
        orderBy: orderBy,
        forceFilter: forceFilter,
        loadItems: loadItems
    };
}]);