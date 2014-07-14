/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('pagination',function(){
    return function(input,pagination){
        var startIndex = (pagination.currentPage -1) * pagination.itemsPerPage;
        var endIndex = startIndex + pagination.itemsPerPage;

        return input.slice(startIndex, endIndex);
    }
});