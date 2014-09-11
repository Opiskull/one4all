angular.module('one4all').factory('filterService', ['settingsService', '$filter', '$rootScope', function (settingsService, $filter, $rootScope) {
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

    function applyFilter(items, pagination) {
        if (!items) return;
        pagination.totalItems = items.length;
        if (hasKeyword())
            items = filterByKeyword(items);
        items = filterByStats(items);
        items = orderItems(items);
        return applyPagination(items, pagination);
    }

    function applyPagination(items, pagination) {
        pagination.filteredItems = items.length;
        var startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
        var endIndex = startIndex + pagination.itemsPerPage;
        return items.slice(startIndex, endIndex);
    }

    function register(scope, Resource) {
        scope.pagination = {currentPage: 1, itemsPerPage: 20, maxSize: 5, totalItems: 0};

        scope.filter = function () {
            scope.filtered = applyFilter(scope.items, scope.pagination);
        };

        scope.orderBy = function (property) {
            if (settings.orderBy.predicate == property) {
                settings.orderBy.reverse = !settings.orderBy.reverse;
            }
            settings.orderBy.predicate = property;
            scope.filter();
        };

        scope.$on('$destroy', function () {
            removeFilter();
        });

        var removeFilter = $rootScope.$on('filter', function () {
            scope.filter();
        });

        function setItems(items) {
            scope.items = items;
            scope.filtered = applyFilter(items, scope.pagination);
        }

        if (!Resource.items) {
            Resource.getList().then(function (items) {
                Resource.items = items;
                setItems(items);
            });
        } else {
            setItems(Resource.items);
        }
    }

    return {
        applyFilter: applyFilter,
        register: register
    };
}]);