/**
 * Created by Christian on 28.01.14.
 */
angular.module('14all').filter('timeAgo',['$window',function($window){
    return function(value,format){
        if(typeof value === 'undefined' || value === null){
            return '';
        }
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            // Milliseconds since the epoch
            value = new Date(parseInt(value, 10));
        }

        var moment = $window.moment(value);
        if(!moment.isValid()){
            return '';
        }

        return moment.fromNow();
    }
}]);