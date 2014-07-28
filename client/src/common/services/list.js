angular.module('14all').factory('listService', ['settingsService', 'itemService', '$rootScope', function (settingsService, itemService, $rootScope) {

    function register(scope, Resource) {
        scope.showInfo = itemService.showInfo;

        scope.remove = function (item) {
            itemService.removeWithDlg(scope.title, scope.items, item).finally(function(){
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
            if (item.isnew) {
                scope.newitem = {};
            }
            item.editable = false;
        };

        scope.add = function () {
            scope.newitem = {isnew: true};
        };

        scope.create = function (item) {
            Resource.post(item).then(function (addedItem) {
                scope.newitem = {};
                scope.items.push(addedItem);
                $rootScope.$emit('filter');
            }, function (response) {
                console.log("Error");
            });
        };
    }

    var service = {
        register: register
    };

    return service;
}]);