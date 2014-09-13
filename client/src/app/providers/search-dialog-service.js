angular.module('providers')
    .factory('searchDialogService', ['$modal', function ($modal) {
        var search = function (title, initalprovider) {
            return $modal.open({
                templateUrl: 'providers/search-dialog.html',
                controller: 'searchDialogCtrl',
                resolve: {
                    initialtitle: function () {
                        return title;
                    },
                    initialprovider: function () {
                        return initalprovider;
                    }
                },
                size: 'lg'
            }).result;
        };
        return {
            search: search
        }
    }]);