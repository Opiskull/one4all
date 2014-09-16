angular.module('one4all').factory('listService', ["$log",'settingsService', 'itemService', '$rootScope', 'dialogService', function ($log, settingsService, itemService, $rootScope, dialogService) {


    function remove(context) {
        return dialogService.remove(context.moduleTitle, context.item.title).result.then(function (result) {
            if (result) {
                itemService.remove(context.items, context.item).then(function () {
                    $rootScope.$emit('filter');
                });
            }
        });
    }

    function edit(context) {
        return dialogService.editItem(context).result.then(function (result) {
            if (result) {
                itemService.updateItems(context.items, result).then(function () {
                    $rootScope.$emit('filter');
                });
            }
        });
    }

    function add(context) {
        return dialogService.addItem(context).result
            .then(function (result) {
            if (result) {
                context.resource.post(result)
                    .then(function (addedItem) {
                        context.items.push(addedItem);
                        $rootScope.$emit('filter');
                    },function(errorResponse){
                        if(errorResponse.data){
                            $log.error(errorResponse.data);
                        }
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