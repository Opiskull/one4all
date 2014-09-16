angular.module('one4all').factory('listService', ["logger",'settingsService', 'itemService', '$rootScope', 'dialogService', function (logger, settingsService, itemService, $rootScope, dialogService) {


    function remove(context) {
        return dialogService.remove(context.moduleTitle, context.item.title).result.then(function (item) {
            if (item) {
                itemService.remove(context.items, context.item).then(function () {
                    $rootScope.$emit('filter');
                });
            }
        });
    }

    function edit(context) {
        return dialogService.editItem(context).result.then(function (item) {
            if (item) {
                itemService.updateItems(context.items, item).then(function () {
                    $rootScope.$emit('filter');
                });
            }
        });
    }

    function add(context) {
        return dialogService.addItem(context).result
            .then(function (item) {
            if (item) {
                context.resource.post(item)
                    .then(function (addedItem) {
                        context.items.push(addedItem);
                        context.item = addedItem;
                        logger.successMessageFromContext(context);
                        $rootScope.$emit('filter');
                    },logger.handleRestErrorResponse);
            }
        });
    }

    return {
        remove: remove,
        edit: edit,
        add: add
    };
}]);