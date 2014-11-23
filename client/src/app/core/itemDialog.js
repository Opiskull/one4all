angular.module('core').factory('itemDialogService', ['dialogService', 'itemRepository', function (dialogService, itemRepository) {
    function remove(context) {
        return dialogService.remove(context.resourceName, context.item.title).result.then(function (answer) {
            if (answer) {
                itemRepository.deleteItem(context.resourceName)(context.item);
            }
        });
    }

    function edit(context) {
        context.templateUrl = context.resourceName + "/" + context.resourceName + '.html';
        context.headerTitle = "Edit " + context.resourceName;
        return dialogService.showItem(context).result.then(function (item) {
            if (item) {
                itemRepository.updateItem(context.resourceName)(item);
            }
        });
    }

    function add(context) {
        context.templateUrl = context.resourceName + "/" + context.resourceName + '.html';
        context.headerTitle = "Create " + context.resourceName;
        return dialogService.showItem(context).result.then(function (item) {
            if (item) {
                itemRepository.createItem(context.resourceName)(item);
            }
        });
    }

    return {
        remove: remove,
        edit: edit,
        add: add
    };
}]);