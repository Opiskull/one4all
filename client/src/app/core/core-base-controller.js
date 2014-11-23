angular.module('core')
    .controller('BaseListCtrl', ['$scope', 'itemService', 'filterService', '$rootScope', 'resourceName', 'itemDialogService', 'objectFactory',
        function ($scope, itemService, filterService, $rootScope, resourceName, itemDialogService, objectFactory) {

            var repository = objectFactory.createItemRepository(resourceName);
            var pagination = objectFactory.createPagination(resourceName);

        $scope.defaultProvider = '';
            $scope.title = resourceName;
            $scope.resourceName = resourceName;

        function createDialogContext() {
            return {
                defaultProvider: $scope.defaultProvider,
                searchInfoCallback: $scope.searchInfoCallback,
                resourceName: resourceName
            };
        }

            $scope.update = repository.update;
        $scope.showInfo = itemService.showInfo;
        $scope.remove = function (item) {
            var context = createDialogContext();
            context.item = item;
            itemDialogService.remove(context);
        };

        $scope.edit = function (item) {
            var context = createDialogContext();
            context.item = angular.copy(item);
            itemDialogService.edit(context);
        };

        $scope.add = function () {
            var context = createDialogContext();
            context.item = {};
            itemDialogService.add(context);
        };

        $scope.orderBy = function (property) {
            filterService.orderBy(property);
        };

            $scope.pagination = pagination;
    }]);
