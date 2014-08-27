angular.module('one4all').directive('bottomPagination', [function () {
    return {
        restrict: 'E',
        template: '<div class="navbar-fixed-bottom navbar-default navbar"><div class="bottom-row"><div class="col-sm-12">'+
        '<add-button add="add()"></add-button><pagination total-items="pagination.filteredItems" ' +
    'ng-model="pagination.currentPage" items-per-page="pagination.itemsPerPage" max-size="pagination.maxSize" ' +
    'class="pull-right pagination-sm" boundary-links="true" ng-change="filter()" ' +
        'previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination></div></div></div>',
        link: function (scope, element, attrs) {

        }
    };
}]);