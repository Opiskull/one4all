angular.module('one4all').factory('listService', ['settingsService', 'itemService', '$rootScope', 'dialogService', function (settingsService, itemService, $rootScope, dialogService) {


    function remove(context) {
        dialogService.remove(context.moduleTitle, context.item.title).result.then(function (result) {
            if (result) {
                itemService.remove(context.items, context.item).then(function () {
                    $rootScope.$emit('filter');
                });
            }
        });
    }

    function edit(context) {
        dialogService.editItem(context).result.then(function (result) {
            if (result) {
                itemService.updateItems(context.items, result).then(function () {
                    $rootScope.$emit('filter');
                });
            }
        });
    }

    function add(context) {
        dialogService.addItem(context).result.then(function (result) {
            if (result) {
                context.resource.post(result).then(function (addedItem) {
                    context.items.push(addedItem);
                    $rootScope.$emit('filter');
                }, function (response) {
                    console.log("Error");
                    console.log(response);
                });
            }
        });
    }

    return {
        remove: remove,
        edit: edit,
        add: add
    };
}]);