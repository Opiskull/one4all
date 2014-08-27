angular.module('one4all').factory('listService', ['settingsService', 'itemService', '$rootScope', 'dialogService', 'Restangular', function (settingsService, itemService, $rootScope, dialogService, Restangular) {
    function register(scope, Resource) {
        scope.showInfo = itemService.showInfo;

        scope.remove = function (item) {
            dialogService.remove(scope.title, item.title).result.then(function (result) {
                if (result) {
                    itemService.remove(scope.items, item).then(function () {
                        $rootScope.$emit('filter');
                    });
                }
            });
        };

        scope.cancel = function (item) {

        };

        scope.edit = function (item) {
            var copiedItem = Restangular.copy(item);
            dialogService.editItem(scope.title + '/'+scope.title+'-edit.html', scope.title, scope.defaultProvider, copiedItem).result.then(function (result) {
                if (result) {
                    itemService.updateItems(scope.items, result).then(function () {
                        $rootScope.$emit('filter');
                    });
                }
            });
        };

        scope.add = function () {
            dialogService.addItem(scope.title + '/'+scope.title+'-add.html', scope.title, scope.defaultProvider).result.then(function (result) {
                if (result) {
                    Resource.post(result).then(function (addedItem) {
                        scope.items.push(addedItem);
                        $rootScope.$emit('filter');
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                    });
                }
            });
        };
    }

    return {
        register: register
    };
}]);