angular.module('core')
    .controller('BaseListCtrl', ['$scope', 'itemService', 'filterService', '$rootScope', 'Resource', 'listService', function ($scope, itemService, filterService, $rootScope, Resource, listService) {
        $scope.defaultProvider = '';
        $scope.title = '';

        function createDialogContext() {
            return {
                moduleTitle: $scope.title,
                defaultProvider: $scope.defaultProvider,
                headerTitle: $scope.title,
                templateUrl: $scope.title + '/' + $scope.title + '.html',
                searchInfoCallback: $scope.searchInfoCallback,
                items: $scope.pagination.totalItems,
                resource: Resource
            };
        }

        $scope.pagination = {
            currentPage: 1,
            itemsPerPage: 20,
            maxSizeCount: 5,
            totalItems: [],
            totalItemsCount: 0,
            filteredItems: [],
            filteredItemsCount: 0,
            pageItems: [],
            pageItemsCount: 0
        };

        $scope.showInfo = itemService.showInfo;

        $scope.remove = function (item) {
            var context = createDialogContext();
            context.item = item;
            listService.remove(context);
        };

        $scope.edit = function (item) {
            var context = createDialogContext();
            context.item = item.clone();
            listService.edit(context);
        };

        $scope.add = function () {
            var context = createDialogContext();
            context.item = {};
            listService.add(context);
        };

        $scope.orderBy = function (property) {
            filterService.orderBy(property);
        };

        var removeFilter = $rootScope.$on('filter', function () {
            $scope.pagination.filtered = filterService.applyFilter($scope.pagination);
        });

        $scope.$on('$destroy', function () {
            removeFilter();
        });

        filterService.loadItems($scope.pagination, Resource);
    }]);
