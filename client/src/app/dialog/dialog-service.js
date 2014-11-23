angular.module('dialog').
    factory('dialogService', ['$modal', function ($modal) {
        var confirm = function (header, msg) {
            return $modal.open({
                templateUrl: 'dialog/dialog-confirm.html',
                controller: 'confirmDialogCtrl',
                resolve: {
                    header: function () {
                        return header;
                    },
                    msg: function () {
                        return msg;
                    }
                }
            })
        };

        var showItem = function (dialogContext) {
            return $modal.open({
                templateUrl: 'dialog/dialog-item.html',
                controller: 'itemDialogCtrl',
                resolve: {
                    dialogContext: function () {
                        return dialogContext;
                    }
                },
                backdrop: 'static'
            })
        };

        return {
            createDialogContext: function () {

            },
            confirm: confirm,
            remove: function (type, title) {
                return confirm('Delete?', "Delete " + type + " '" + title + "'?");
            },
            showItem: showItem
        }
    }]);