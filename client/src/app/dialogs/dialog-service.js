angular.module('dialogs').
    factory('dialogService', ['$modal', function ($modal) {
        var resolveItemParameters = function(templateUrl, headerTitle, defaultProvider){
            return {
                defaultProvider: function(){
                    return defaultProvider;
                },
                headerTitle: function(){
                    return headerTitle;
                },
                templateUrl: function(){
                    return templateUrl;
                }
            };
        };

        var confirm = function (header, msg) {
            return $modal.open({
                templateUrl: 'dialogs/dialog-confirm.html',
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

        var addItem = function(templateUrl,headerTitle,defaultProvider){
            var resolvedParameters = resolveItemParameters(templateUrl, headerTitle, defaultProvider);
            return $modal.open({
                templateUrl: 'dialogs/dialog-add-item.html',
                controller:'addDialogCtrl',
                resolve: resolvedParameters,
                backdrop: 'static'
            })
        };

        var editItem = function(templateUrl,headerTitle,defaultProvider,item){
            var resolvedParameters = resolveItemParameters(templateUrl, headerTitle, defaultProvider);
            resolvedParameters.item = function(){
                return item;
            };
            return $modal.open({
                template: 'dialogs/dialog-edit-item.html',
                controller:'editDialogCtrl',
                resolve: resolvedParameters,
                backdrop: 'static'
            })
        };

        return{
            confirm: confirm,
            remove: function (type, title) {
                return confirm('Delete?', "Delete " + type + " '" + title + "'?").result.then(function (result) {
                    return result === 'yes';
                }, function (result) {
                    return false;
                });
            },
            addItem: addItem,
            editItem: editItem
        }
    }]);