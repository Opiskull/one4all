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

        var addItem = function (dialogParameters) {
            return $modal.open({
                templateUrl: 'dialog/dialog-add-item.html',
                controller: 'addDialogCtrl',
                resolve: {
                    dialogParameters: function () {
                        return dialogParameters;
                    }
                },
                backdrop: 'static'
            })
        };

        var editItem = function (dialogParameters) {
            return $modal.open({
                templateUrl: 'dialog/dialog-edit-item.html',
                controller: 'editDialogCtrl',
                resolve: {
                    dialogParameters: function () {
                        return dialogParameters;
                    }
                },
                backdrop: 'static'
            })
        };

        return {
            confirm: confirm,
            remove: function (type, title) {
                return confirm('Delete?', "Delete " + type + " '" + title + "'?");
            },
            addItem: addItem,
            editItem: editItem
        }
    }]);