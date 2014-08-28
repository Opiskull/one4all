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

        function createDialogParameters(type){
            return {
                defaultProvider: scope.defaultProvider,
                headerTitle: scope.title,
                templateUrl: scope.title + '/'+scope.title+'-'+type+'.html',
                searchInfoCallback: scope.searchInfoCallback
            };
        }

        scope.edit = function (item) {
            var dialogParameters = createDialogParameters('edit');
            dialogParameters.item= Restangular.copy(item);

            dialogService.editItem(dialogParameters).result.then(function (result) {
                if (result) {
                    itemService.updateItems(scope.items, result).then(function () {
                        $rootScope.$emit('filter');
                    });
                }
            });
        };

        scope.add = function () {
            var dialogParameters = createDialogParameters('add');

            dialogService.addItem(dialogParameters).result.then(function (result) {
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