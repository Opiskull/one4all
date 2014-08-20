angular.module('14all').factory('listService', ['settingsService', 'itemService', '$rootScope','dialogService', function (settingsService, itemService, $rootScope,dialogService) {
    function register(scope, Resource) {
        scope.showInfo = itemService.showInfo;

        scope.remove = function (item) {
            itemService.removeWithDlg(scope.title, scope.items, item).finally(function () {
                $rootScope.$emit('filter');
            });
        };

        scope.update = function (item) {
            itemService.update(item).then(function (updated) {
                updated.editable = false;
                $rootScope.$emit('filter');
            });
        };

        scope.cancel = function (item) {
            item.editable = false;
        };

        scope.add = function () {
            dialogService.addItem(scope.title + '/add.html', scope.title, scope.defaultProvider).result.then(function(result){
                if(result){
                    scope.create(result);
                }
            });
        };

        scope.create = function (item) {
            Resource.post(item).then(function (addedItem) {
                scope.newitem = {};
                scope.items.push(addedItem);
                $rootScope.$emit('filter');
            }, function (response) {
                console.log("Error");
                console.log(response);
            });
        };
    }

    return {
        register: register
    };
}]);