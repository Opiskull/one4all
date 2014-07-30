angular.module('14all').factory('filterService', ['settingsService', '$filter', '$rootScope', function (settingsService, $filter, $rootScope) {
    var settings = settingsService.settings;

    function isKeyword() {
        return settings.filters.keyword !== '';
    }

    function isStats() {
        var enabled = false;
        angular.forEach(settings.filters.stats, function (stat, statKey) {
            if (settings.filters.stats[statKey])
                enabled = true;
        });
        return enabled;
    }

    function filterKeyword(items) {
        //if(isKeyword()) return $filter('filter')(items, {title:settings.filters.keyword});
        return _.filter(items, function (item) {
            return _.contains(item.title.toLowerCase(), settings.filters.keyword.toLowerCase());
        });
    }

    function filterStats(items) {
        //if(isStats()) return $filter('filter')(items,filterItemStats);
        return _.filter(items, filterItemStats);
    }

    function filterItemStats(item) {
        if (!item.stats) return true;
        var result = true;
        angular.forEach(settings.filters.stats, function (stat, statKey) {
            if (stat) {
                if (item.stats[statKey]) {
                    result = false;
                }
            }
        });
        return result;
//        return _.some(settings.filters.stats,function(stat,key){ return item.stats[key];})
    }

    function orderItems(items) {
        items = _.sortBy(items, settings.orderBy.predicate);
        if (settings.orderBy.reverse)
            items.reverse();
        return items;
        //return $filter('orderBy')(items,settings.orderBy.predicate,settings.orderBy.reverse);
    }

    function applyFilter(items, pagination) {
        pagination.totalItems = items.length;
        if (isKeyword())
            items = filterKeyword(items);
        if (isStats())
            items = filterStats(items);
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
        scope.pagination = { currentPage: 1, itemsPerPage: 20, maxSize: 5, totalItems: 0};

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
            remove();
        });

        var remove = $rootScope.$on('filter', function () {
            scope.filter();
        });

        function setItems(items){
            scope.items = items;
            scope.filtered = applyFilter(items, scope.pagination);
        }

        if(!Resource.items){
            Resource.getList().then(function (items) {
                Resource.items = items;
                setItems(items);
            });
        } else {
            setItems(Resource.items);
        }
    }

    var service = {
        applyFilter: applyFilter,
        register: register
    };

    return service;
}]);